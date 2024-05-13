# myapp/views.py
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai
import uuid

@csrf_exempt
def index(request):
    if request.method == "POST":
        theUserInput = request.POST.get('message')
        client = openai.Client(api_key="your api key")
        theUser = "Co-Adviser"
        thread = "thread_LfkiFx4w52LBBveRLkOb1FHQ"
        client.beta.threads.messages.create(
            thread_id=thread,
            role="user",
            content=theUserInput
        )
        run = client.beta.threads.runs.create(
            thread_id=thread,
            assistant_id="your ass key",
            instructions=f"Please address the user as {theUser} including the response."
        )
        while True:
            run = client.beta.threads.runs.retrieve(
                thread_id=thread,
                run_id=run.id
            )
            if run.status == 'completed':
                break
            else:
                pass
        messages = client.beta.threads.messages.list(
            thread_id=thread
        )
        
        # Generate a unique ID for the message
        message_id = str(uuid.uuid4())
        
        # Return the message with its unique ID
        return JsonResponse({
            'id': message_id,
            'message': messages.data[0].content[0].text.value
        })

    return JsonResponse({'error': 'Not Found'}, status=400)
