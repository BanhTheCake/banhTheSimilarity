import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
    organization: process.env.ORGANIZATION_ID_OPENAI,
    apiKey: process.env.API_KEY_OPENAI,
});
const openai = new OpenAIApi(configuration);
export default openai;
