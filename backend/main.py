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
async def create_user(user: ReportSchema):
    with Session() as session:
        r = Report(**user.dict())
        session.add(r)
        session.commit()
        session.refresh(r)
    return r.to_dict()


@app.post("/report_items")
async def create_user(user: ReportItemSchema):
    with Session() as session:
        r = ReportItem(**user.dict())
        session.add(r)
        session.commit()
        session.refresh(r)
    return r.to_dict()
