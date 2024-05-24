const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    quizId : { 
        type: String, 
        unique: true 
    },
    quiz_name : {
        type : String,
        required : true
    },
    quiz_type : {
        type : String,
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
                required : true
            }
        }
    ]
})

const QuizModel = mongoose.model('Quiz', quizSchema)
module.exports = QuizModel

// {
//     "quiz_name": "dsajdnjsan",
//     "quiz_type": "qa",
//     "option_type": "text",
//     "timer": 5,
//     "questions": [
//         {
//             "question": "What is the capital of France?",
//             "options": [
//                 {
//                     "text": "London",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Paris",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Berlin",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Rome",
//                     "imageUrl": ""
//                 }
//             ],
//             "correctAnswerIndex": 1
//         },
//         {
//             "question": "Which planet is known as the Red Planet?",
//             "options": [
//                 {
//                     "text": "Venus",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Mars",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Jupiter",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Saturn",
//                     "imageUrl": ""
//                 }
//             ],
//             "correctAnswerIndex": 1
//         },
//         {
//             "question": "What is the largest mammal?",
//             "options": [
//                 {
//                     "text": "Elephant",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Hippo",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Giraffe",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Blue Whale",
//                     "imageUrl": ""
//                 }
//             ],
//             "correctAnswerIndex": 3
//         },
//         {
//             "question": "Who wrote 'To Kill a Mockingbird'?",
//             "options": [
//                 {
//                     "text": "Harper Lee",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Ernest Hemingway",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "F. Scott Fitzgerald",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "Mark Twain",
//                     "imageUrl": ""
//                 }
//             ],
//             "correctAnswerIndex": 0
//         },
//         {
//             "question": "What is the chemical symbol for water?",
//             "options": [
//                 {
//                     "text": "O2",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "CO2",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "H20",
//                     "imageUrl": ""
//                 },
//                 {
//                     "text": "H2SO4",
//                     "imageUrl": ""
//                 }
//             ],
//             "correctAnswerIndex": 2
//         }
//     ]
// }