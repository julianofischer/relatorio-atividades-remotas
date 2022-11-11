from pydantic import BaseModel, EmailStr, validator
from datetime import datetime
from typing import Optional


class UserSchema(BaseModel):
    id: Optional[int]
    password: str
    password2: str
    full_name: str
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
    id: int
    ref_month: datetime
    user_id: int

    class Config:
        orm_mode = True


class ReportItemSchema(BaseModel):
    id: int
    report_id: int
    date: datetime
    init_hour: str
    end_hour: str

    class Config:
        orm_mode = True
