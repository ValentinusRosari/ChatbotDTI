import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.language.questionanswering import QuestionAnsweringClient
from flask import Flask,request,jsonify

app = Flask(__name__)

endpoint = os.environ["AZURE_ENDPOINT"]
key = os.environ["AZURE_KEY"]

client = QuestionAnsweringClient(endpoint, AzureKeyCredential(key))

@app.route("/get_answer", methods=["POST"])
def get_answer():
    data = request.json
    question = data.get("question")
    
    output = client.get_answers(
        question=question,
        project_name="firstTesting",
        deployment_name="https://ugm/ac/id/en/"
    )
    
    answers = []
    for candidate in output.answers:
        answer_info = {
            "confidence": candidate.confidence,
            "answer": candidate.answer,
            "source": candidate.source
        }
        answers.append(answer_info)
    
    return jsonify(answers)

if __name__ == "__main__":
    app.run(debug=True)