from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .database import Base, engine
from .routers import blogs, items


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Idempotent: creates tables if they don't exist.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Web Porto API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)
app.include_router(blogs.router)


@app.get("/")
def root():
    return {"status": "ok", "docs": "/docs"}