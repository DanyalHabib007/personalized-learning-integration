import logging
import warnings
from qdrant_client import QdrantClient
from llama_index.llms.ollama import Ollama
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, StorageContext, Settings
from llama_index.vector_stores.qdrant import QdrantVectorStore
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.core.memory import ChatMemoryBuffer

warnings.filterwarnings("ignore")

class AIVoiceAssistant:
    def __init__(self):
        # Configure logging
        logging.basicConfig(level=logging.INFO)
        self._logger = logging.getLogger(__name__)

        # Initialize Qdrant client
        self._qdrant_url = "http://localhost:6333"
        self._client = QdrantClient(url=self._qdrant_url, prefer_grpc=False)

        # Configure global settings
        Settings.llm = Ollama(model="llama3.1", request_timeout=300.0)
        Settings.embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")

        self._index = None

        # Create knowledge base and chat engine
        self._create_kb()
        self._create_chat_engine()

    def _create_chat_engine(self):
        if self._index is None:
            self._logger.error("Knowledge base creation failed. Cannot create chat engine.")
            return

        memory = ChatMemoryBuffer.from_defaults(token_limit=1500)

        # Use a static system prompt at initialization
        self._chat_engine = self._index.as_chat_engine(
            chat_mode="context",
            memory=memory,
            system_prompt=self._initial_system_prompt  # Set a static system prompt during initialization
        )
        self._logger.info("Chat engine created successfully!")

    def _create_kb(self):
        try:
            self._logger.info("Starting to create the knowledge base...")
            reader = SimpleDirectoryReader(
                input_files=[r"C:\Users\HP\Downloads\voice_assistant_llm-main\voice_assistant_llm-main\rag\lms.txt"]
            )
            documents = reader.load_data()
            vector_store = QdrantVectorStore(client=self._client, collection_name="lms_db")
            storage_context = StorageContext.from_defaults(vector_store=vector_store)
            self._index = VectorStoreIndex.from_documents(
                documents, storage_context=storage_context
            )
            self._logger.info("Knowledge base created successfully!")
        except Exception as e:
            self._logger.error(f"Error while creating knowledge base: {e}")
            self._index = None  # Ensure that self._index is None if an error occurs

    def interact_with_llm(self, quiz_score=None, learning_style=None, course_selected=None, user_rating=None, area_of_interest=None):
        if not hasattr(self, '_chat_engine'):
            self._logger.error("Chat engine is not initialized.")
            return None

        try:
            # Generate the dynamic prompt based on input variables
            dynamic_prompt = self._format_prompt(
                quiz_score=quiz_score,
                learning_style=learning_style,
                course_selected=course_selected,
                user_rating=user_rating,
                area_of_interest=area_of_interest
            )
            
            response = self._chat_engine.chat(dynamic_prompt)
            answer = response.response
            return answer
        except Exception as e:
            self._logger.error(f"Error during interaction with LLM: {e}")
            return None

    def _format_prompt(self, quiz_score, learning_style, course_selected, user_rating, area_of_interest):
        """
        Formats the dynamic user-specific information into a prompt to pass to the LLM.
        """
        return f"""
            YYou are an intelligent course recommendation assistant for LearnX Academy. Your role is to help users find the next best course based on their inputs. Here's how you should handle the information:

            1. **Greeting**: Start with a friendly greeting. For example: 'Hello, welcome to LearnX Academy! How can I assist you with your learning journey today?'

            2. **Input Variables**:
                - **Quiz Score**: {quiz_score}
                - **Learning Style**: {learning_style}
                - **Course Selected**: {course_selected}
                - **User Rating**: {user_rating}
                - **Area of Interest**: {area_of_interest}

            3. **Recommendations**:
                - If the **User Rating** is greater than 3, recommend courses within the same domain as the **Course Selected**.
                - If the **User Rating** is 3 or below, suggest some basic courses or recommend exploring a different domain.

            4. **Learning Path**:
                - Generate a learning path for the domain based on the **Area of Interest**. Include foundational courses leading up to more advanced topics.

            - Keep your responses engaging and concise, suitable for a conversational interface. 
            - Provide relevant suggestions based on the criteria above and ensure the recommendations align with the user's preferences and performance.

            Be helpful, professional, and adapt to the user's feedback to provide the best learning experience and most important just give a list of recommendation.
        """

    @property
    def _initial_system_prompt(self):
        """
        Returns the static system prompt that initializes the chat engine.
        This is a general prompt and does not require dynamic user-specific input.
        """
        return """
            You are an intelligent course recommendation assistant for LearnX Academy. Your role is to assist users with course recommendations based on their learning preferences. Greet the user politely and offer course suggestions based on their inputs.
        """
