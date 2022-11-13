from pydantic import BaseModel, Field, EmailStr, validator
from datetime import datetime
from typing import Optional


class UserSchema(BaseModel):
    id: Optional[int]
    password: str
    password2: str
    full_name: str = Field(max_length=100, min_length=2)
    email: EmailStr
    supervisor: Optional[int]
    is_supervisor: Optional[bool]

    @validator("full_name")
    def name_must_contain_space(cls, v):
        if " " not in v:
            raise ValueError("Nome completo precisa conter espaço")
        return v

    @validator("password2")
    def passwords_match(cls, v, values, **kwargs):
        if "password" in values and v != values["password"]:
            raise ValueError("Senhas não conferem")
        return v

    class Config:
        orm_mode = True


class ReportSchema(BaseModel):
    id: int | None
    ref_month: datetime
    user_id: int
    approval_requested: bool | None
    date_approval_requested: datetime | None
    approved: bool | None
    date_approved: datetime | None
    approver: int | None

    class Config:
        orm_mode = True


class ReportItemSchema(BaseModel):
    id: Optional[int]
    report_id: int
    date: datetime
    init_hour: str = Field(max_length=5, min_length=5)
    end_hour: str = Field(max_length=5, min_length=5)

    @validator("init_hour", "end_hour")
    @classmethod
    def validate_hour_string(cls, v):
        splitted = v.split(":")
        if len(splitted) != 2:
            raise ValueError("Hora inválida")
        if not splitted[0].isdigit() or not splitted[1].isdigit():
            raise ValueError("Hora inválida")
        return v

    class Config:
        orm_mode = True
