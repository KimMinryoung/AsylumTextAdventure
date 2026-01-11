from google import genai
from google.genai import types
from PIL import Image
import io
import os
import time

API_KEY = "AIzaSyCoq0WSHODplyBPufTPUr5j28CcvF04M_0"
OUTPUT_DIR = r"C:\Users\DESKTOP\Documents\AIToyProject\client\public\images\characters"

client = genai.Client(api_key=API_KEY)

characters = [
    {
        "id": "messiah",
        "name": "메시아 죄수",
        "prompt": "Anime style portrait of a male prisoner with a serene, enlightened expression. He has long flowing hair, gentle wise eyes, and wears an orange prison jumpsuit. He has a calm, almost divine aura about him. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "arsonist",
        "name": "방화범 죄수",
        "prompt": "Anime style portrait of a male prisoner with wild, excited eyes and messy spiky red hair. He has burn scars on his face and wears an orange prison jumpsuit. His expression shows chaotic enthusiasm. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "groper",
        "name": "치한 죄수",
        "prompt": "Anime style portrait of a nervous-looking male prisoner with greasy slicked-back dark hair and shifty eyes. He wears an orange prison jumpsuit and has a suspicious expression. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "fraudster",
        "name": "사기꾼 죄수",
        "prompt": "Anime style portrait of a charming, well-groomed male prisoner with slick hair and a confident smirk. He wears an orange prison jumpsuit but maintains an air of sophistication. His eyes are calculating and clever. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "political",
        "name": "정치범 죄수",
        "prompt": "Anime style portrait of an intellectual-looking male prisoner with glasses and neat short hair. He has a dignified, defiant expression and wears an orange prison jumpsuit. He looks like a former politician or activist. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "wifekiller",
        "name": "아내 살인범 죄수",
        "prompt": "Anime style portrait of a middle-aged male prisoner with a haunted, emotionless expression. He has tired eyes with dark circles, receding hairline, and wears an orange prison jumpsuit. His face shows deep regret. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    },
    {
        "id": "pedophile",
        "name": "소아성폭력범 죄수",
        "prompt": "Anime style portrait of a balding, overweight male prisoner with thick glasses and a meek expression. He wears an orange prison jumpsuit and looks uncomfortable. Clean light gray background, bust shot, high quality anime art style similar to visual novel character portrait."
    }
]

def generate_image_gemini(character, max_retries=3):
    """Gemini 2.5 Flash로 이미지 생성 시도"""
    for attempt in range(max_retries):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash-image",
                contents=character['prompt'],
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
