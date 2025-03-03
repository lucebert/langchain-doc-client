import os

import chainlit as cl
from langgraph_sdk import get_client
from langchain_core.messages import HumanMessage

LANGGRAPH_DEPLOYMENT = os.environ.get("LANGGRAPH_DEPLOYMENT")

@cl.on_chat_start
async def on_start():
    # Initialize the Langgraph client
    langraph_client = get_client(
        url=LANGGRAPH_DEPLOYMENT
    )
    assistants = await langraph_client.assistants.search(
        graph_id="simple_rag", metadata={"created_by": "system"}
    )

    thread = await langraph_client.threads.create()

    cl.user_session.set("langraph_client", langraph_client)
    cl.user_session.set("assistant_id", assistants[0]["assistant_id"])
    cl.user_session.set("thread_id", thread["thread_id"])


@cl.on_message
async def main(message: cl.Message):
    msg = cl.Message(content="")

    langraph_client = cl.user_session.get("langraph_client")
    assistant_id = cl.user_session.get("assistant_id")
    thread_id = cl.user_session.get("thread_id")

    print(f"Assistant ID: {assistant_id}")
    print(f"Thread ID: {thread_id}")

    async with cl.Step(name="Scanning documentation") as step:

        async for chunk in langraph_client.runs.stream(
            thread_id=thread_id,
            assistant_id=assistant_id,
            input={
                "messages": [
                    HumanMessage(content=message.content)
                ]
            },
            config={
                "search_kwargs": {
                    "k": 10
                }
            },
            stream_mode="events",
        ):
            if chunk.event == "events":
                if chunk.data["event"] == "on_chat_model_stream":
                    await msg.stream_token(chunk.data["data"]["chunk"]["content"])
                else:
                    if "data" in chunk.data and "input" in chunk.data["data"]:
                        step.input = chunk.data["data"]["input"]
                    if "data" in chunk.data and "output" in chunk.data["data"]:
                        step.output = chunk.data["data"]["output"]

    await msg.send()
