from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ItemCreate(BaseModel):
    name: str


class ItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str


class BlogCreate(BaseModel):
    title: str
    slug: str
    excerpt: str
    content: str
    image: str | None = None
    published: bool = True


class BlogUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    excerpt: str | None = None
    content: str | None = None
    image: str | None = None
    published: bool | None = None


class BlogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    slug: str
    excerpt: str
    content: str
    image: str | None
    published: bool
    created_at: datetime