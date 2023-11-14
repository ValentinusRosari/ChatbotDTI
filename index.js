const {BeginConfiguration,OpenAIApi} = require('openai');

const config  = new BeginConfiguration({
    apiKey:'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'
});

const openai = new OpenAIApi(config)

const beginPrompt = async() => {
    const prompt = 'Tell me a joke about a cat eating a pasta';
    const response = await openai.createCompletion({
        model:'text-davinci-003',
    })
}
