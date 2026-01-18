from google import genai
from google.genai import types
from PIL import Image
from dotenv import load_dotenv
import io
import os
import time

load_dotenv()
API_KEY = os.environ.get('GEMINI_API_KEY')
OUTPUT_DIR = r"C:\Users\DESKTOP\Documents\AIToyProject\client\public\images\characters"

client = genai.Client(api_key=API_KEY)

characters = [
    {
        "id": "messiah",
        "name": "메시아 죄수",
        "prompt": "A cult leader with a serene, enlightened expression. She has long flowing hair, gentle wise eyes, and a calm, almost divine aura about her."
    },
    {
        "id": "arsonist",
        "name": "방화범 죄수",
        "prompt": "A prisoner with wild, excited eyes and messy long red hair. She has burn scars on her face and her expression shows chaotic enthusiasm."
    },
    {
        "id": "groper",
        "name": "치한 죄수",
        "prompt": "A nervous-looking prisoner with greasy slicked-back dark hair and shifty eyes. She has a suspicious expression and dark shadow under her eyes, which represents her perverted desire."
    },
    {
        "id": "fraudster",
        "name": "사기꾼 죄수",
        "prompt": "Well-groomed beautiful prisoner with slick hair and a confident smirk. She maintains an air of sophistication and her eyes are calculating and clever."
    },
    {
        "id": "political",
        "name": "정치범 죄수",
        "prompt": "an intellectual-looking prisoner with glasses and neat short hair. She has a dignified, defiant expression and looks like a former political activist."
    },
    {
        "id": "wifekiller",
        "name": "아내 살인범 죄수",
        "prompt": "A bereaved prisoner with a haunted, emotionless expression. She has tired eyes with deep sadness. She killed her crazy wife to save her son."
    },
    {
        "id": "pedophile",
        "name": "소아성폭력범 죄수",
        "prompt": "prisoner with glasses and a meek expression. The eyes are dead, and the mouth is twisted with dissatisfied desire."
    }
]

def generate_image_gemini(character, max_retries=3):
    """Gemini 2.5 Flash로 이미지 생성 시도"""
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents= "Anime style 2d girl headshot portrait of prisoner in blue prison jumpsuit, " + character['prompt'] + "Clean light gray background, Head and Shoulders Portrait, high quality anime art style similar to visual novel character portrait.",
                config=types.GenerateContentConfig(
                    response_modalities=['Text', 'Image']
                )
            )

            for part in response.candidates[0].content.parts:
                if part.inline_data is not None:
                    image_data = part.inline_data.data
                    image = Image.open(io.BytesIO(image_data))

                    output_path = os.path.join(OUTPUT_DIR, f"{character['id']}.png")
                    image.save(output_path, 'PNG')
                    print(f"  Saved: {output_path}")
                    return True

            print(f"  No image in response")
            return False

        except Exception as e:
            error_str = str(e)
            if "429" in error_str or "RESOURCE_EXHAUSTED" in error_str:
                wait_time = 60 * (attempt + 1)
                print(f"  Rate limited, waiting {wait_time}s... (attempt {attempt+1}/{max_retries})")
                time.sleep(wait_time)
            else:
                print(f"  Error: {e}")
                return False
    return False


def generate_image(character):
    print(f"Generating image for {character['name']} ({character['id']})...")

    print("  Trying Gemini...")
    return generate_image_gemini(character)

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Output directory: {OUTPUT_DIR}")
    print(f"Total characters to generate: {len(characters)}")
    print("-" * 50)

    success_count = 0
    for i, character in enumerate(characters):
        print(f"\n[{i+1}/{len(characters)}]")
        if generate_image(character):
            success_count += 1
        time.sleep(5)

    print("\n" + "=" * 50)
    print(f"Generation complete: {success_count}/{len(characters)} images created")

if __name__ == "__main__":
    main()
