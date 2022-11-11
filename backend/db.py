from sqlalchemy import Date, ForeignKey, Boolean, Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///db.sqlite3")
Session = sessionmaker(bind=engine)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    password = Column(String)
    full_name = Column(String)
    email = Column(String)
    supervisor = Column(Integer, ForeignKey("users.id"))
    is_supervisor = Column(Boolean, default=False)

    def __repr__(self):
        return f"User(id={self.id}, password={self.password}, \
               full_name={self.full_name}, email={self.email})"

    def to_dict(self):
        return {
            "id": self.id,
            "password": self.password,
            "full_name": self.full_name,
            "email": self.email,
            "supervisor": self.supervisor,
            "is_supervisor": self.is_supervisor,
        }


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True)
    ref_month = Column(Date)
    user_id = Column(Integer, ForeignKey("users.id"))

    def to_dict(self):
        return {
            "id": self.id,
            "ref_month": self.ref_month,
            "user_id": self.user_id,
        }


class ReportItem(Base):
    __tablename__ = "report_items"

    id = Column(Integer, primary_key=True)
    report_id = Column(Integer, ForeignKey("reports.id"))
    date = Column(Date)
    init_hour = Column(String(5))  # 00:00
    end_hour = Column(String(5))  # 00:00

    def to_dict(self):
        return {
            "id": self.id,
            "report_id": self.report_id,
            "date": self.date,
            "init_hour": self.init_hour,
            "end_hour": self.end_hour,
        }


def main():
    Base.metadata.create_all(engine)


if __name__ == "__main__":
    main()
