from fastapi import FastAPI, HTTPException
from .db import Session, User, Report, ReportItem
from .schemas import UserSchema, ReportSchema, ReportItemSchema
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users")
async def get_users():
    with Session() as session:
        users = session.query(User).all()
        return [user.to_dict() for user in users]


@app.get("/users/{user_id}")
async def get_users(user_id: int):
    with Session() as session:
        user = session.get(User, user_id)
        if user:
            return user.to_dict()
        else:
            return HTTPException(status_code=404, detail="User not found")


@app.post("/users")
async def create_user(user: UserSchema):
    with Session() as session:
        u = User(**user.dict())
        session.add(u)
        session.commit()
        session.refresh(u)
    return u.to_dict()


@app.post("/reports")
async def create_report(user: ReportSchema):
    with Session() as session:
        r = Report(**user.dict())
        session.add(r)
        session.commit()
        session.refresh(r)
    return r.to_dict()


@app.get("/reports")
async def get_reports():
    with Session() as session:
        items = session.query(Report).all()
        return [item.to_dict() for item in items]


@app.get("/reports/{report_id}")
async def get_report(report_id: int):
    with Session() as session:
        item = session.query(Report).get(report_id)
        return item.to_dict()


@app.post("/reports/{report}/items")
async def create_report_item(report: int, item: ReportItemSchema):
    with Session() as session:
        r = ReportItem(**item.dict())
        session.add(r)
        session.commit()
        session.refresh(r)
    return r.to_dict()


@app.get("/reports/{report}/items")
async def get_report_items(report: int):
    with Session() as session:
        items = session.query(ReportItem).filter(ReportItem.report_id == report).all()
        return [item.to_dict() for item in items]
