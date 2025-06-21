from transformers import AutoTokenizer, AutoModelForCausalLM

model_name = "AI-Sweden-Models/gpt-sw3-6.7b-v2"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

# Exempel på prompt för skämt
prompt = "Här är ett roligt skämt:\n"
# eller
prompt = "Berätta ett skämt om katter:\n"
