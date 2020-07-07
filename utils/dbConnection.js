import mongoose from 'mongoose';
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.USERDB}:${process.env.PSWDB}@cluster0-ocyvl.mongodb.net/accounts?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error){
        console.log('Erro ao conectar ao MongoDB')
    }
}

export default connectDb;