from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/blogs", tags=["blogs"])


@router.get("", response_model=list[schemas.BlogOut])
def list_blogs(
    published_only: bool = True, db: Session = Depends(get_db)
):
    query = db.query(models.Blog)
    if published_only:
        query = query.filter(models.Blog.published.is_(True))
    return query.order_by(models.Blog.created_at.desc()).all()


@router.get("/slug/{slug}", response_model=schemas.BlogOut)
def get_blog_by_slug(slug: str, db: Session = Depends(get_db)):
    blog = (
        db.query(models.Blog)
        .filter(models.Blog.slug == slug, models.Blog.published.is_(True))
        .first()
    )
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.get("/{blog_id}", response_model=schemas.BlogOut)
def get_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.get(models.Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.post("", response_model=schemas.BlogOut, status_code=201)
def create_blog(payload: schemas.BlogCreate, db: Session = Depends(get_db)):
    blog = models.Blog(**payload.model_dump())
    db.add(blog)
    try:
        db.commit()
    except Exception:
        db.rollback()
        raise HTTPException(status_code=409, detail="Slug already exists")
    db.refresh(blog)
    return blog


@router.patch("/{blog_id}", response_model=schemas.BlogOut)
def update_blog(
    blog_id: int, payload: schemas.BlogUpdate, db: Session = Depends(get_db)
):
    blog = db.get(models.Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(blog, field, value)
    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/{blog_id}", status_code=204)
def delete_blog(blog_id: int, db: Session = Depends(get_db)):
    blog = db.get(models.Blog, blog_id)
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
