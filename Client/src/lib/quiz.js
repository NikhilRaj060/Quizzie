const quizTypes = [
  {
    id: "qa",
    name: "Q & A",
    isActive: false,
  },
  {
    id: "pt",
    name: "Poll Type",
    isActive: false,
  },
];

const optionTypes = [
  {
    id: "text",
    name: "Text",
  },
  {
    id: "image",
    name: "Image URL",
  },
  {
    id: "text_image",
    name: "Text & Image URL",
  },
];

const timerOptions = [
  {
    id : 0,
    name: "OFF",
    value : 0,
    isSelected : true,
  },
  {
    id : 1,
    name: "5 Sec",
    value : 5,
    isSelected : false,
  },
  {
    id : 2,
    name: "10 Sec",
    value : 10,
    isSelected : false,
  }
]

export { quizTypes, optionTypes , timerOptions };
