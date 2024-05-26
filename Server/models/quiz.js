const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    userId : {
        type : String,
        required : true
    },
    quizId : { 
        type: String, 
        unique: true,
        required : true,
    },
    quizLink : {
        type : String,
        unique : true,
        required : true,
    },
    quiz_name : {
        type : String,
        required : true
    },
    quiz_type : {
        type : String,
        required : true
    },
    impression : {
        type : Number,
        required : true
    },
    option_type : {
        type : String,
        required : true
    },
    timer : {
        type : Number,
        required : true
    },
    questions : [
        {
            question : {
                type : String,
                required : true
            },
            options : [
                {
                    text : {
                        type : String,
                    },
                    imageUrl : {
                        type : String,
                    }
                }
            ],
            correctAnswerIndex : {
                type : Number,
            },
            attempted : {
                type : Number,
                required : true
            },
            peopleAttemptedCorrectAnswer : {
                type : Number,
                required : true
            }
        }
    ]
},{timestamps: {createdAt: 'createdAt' , updatedAt: "updatedAt" }})

const QuizModel = mongoose.model('Quiz', quizSchema)
module.exports = QuizModel