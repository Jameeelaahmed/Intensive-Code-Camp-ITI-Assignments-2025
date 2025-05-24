// // List<Map> datalist = [
// // {
// //   "taskType": "To Do",
// //   "data":[
// //     {"task": "Buy groceries", "time": "5 PM"},
// //     {"task": "Buy fruits", "time": "7 PM"},
// //     {"task": "Buy vegetables", "time": "8 PM"},
// //     {"task": "Buy milk", "time": "9 PM"},
// //     {"task": "Buy eggs", "time": "10 PM"},

// //   ]
// // },
// // {
// //   "taskType": "Done",
// //   "data":[
// //     {"task": "Finsih course", "time": "5 PM"},

// //   ]
// // }
// // ];

// class TaskCategoryModel {
//   final String taskType;
//   final List<TaskModel> data;

//   TaskCategoryModel({required this.taskType, required this.data});

//   factory TaskCategoryModel.fromJson(Map<String, dynamic> json) {
//     return TaskCategoryModel(
//       taskType: json['taskType'],
//       data:
//           (json['data'] as List)
//               .map((taskJson) => TaskModel.fromJson(taskJson))
//               .toList(),
//     );
//   }

//   Map<String, dynamic> toJson() {
//     return {
//       'taskType': taskType,
//       'data': data.map((task) => task.toJson()).toList(),
//     };
//   }
// }

// class TaskModel {
//    String task;
//    String time;

//   TaskModel({required this.task, required this.time});

//   factory TaskModel.fromJson(Map<String, dynamic> json) {
//     return TaskModel(task: json['task'], time: json['time']);
//   }

//   Map<String, dynamic> toJson() {
//     return {'task': task, 'time': time};
//   }
// }

// List<TaskCategoryModel> datalist = [
//   TaskCategoryModel(
//     taskType: "To Do",
//     data: [
//       TaskModel(task: "Buy groceries", time: "5 PM"),
//       TaskModel(task: "Buy fruits", time: "7 PM"),
//       TaskModel(task: "Buy vegetables", time: "8 PM"),
//       TaskModel(task: "Buy milk", time: "9 PM"),
//       TaskModel(task: "Buy eggs", time: "10 PM"),
//     ],
//   ),
//     TaskCategoryModel(
//     taskType: "Done",
//     data: [
//       TaskModel(task: "Finish course", time: "5 PM"),
//       TaskModel(task: "Clean room", time: "4 PM"),
//     ],
//   ),
  
//    TaskCategoryModel(
//     taskType: "Deleted",
//     data: [],
    
//   ), 
      
// ];
class TaskCategoryModel {
  final String taskType;
  final int taskTypeId;
  final List<TaskModel> data;

  TaskCategoryModel({
    required this.taskType,
    required this.taskTypeId,
    required this.data,
  });

  factory TaskCategoryModel.fromJson(Map<String, dynamic> json) {
    return TaskCategoryModel(
      taskType: json['taskType'],
      taskTypeId: json['taskTypeId'],
      data: (json['data'] as List)
          .map((taskJson) => TaskModel.fromJson(taskJson))
          .toList(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'taskType': taskType,
      'taskTypeId': taskTypeId,
      'data': data.map((task) => task.toJson()).toList(),
    };
  }
}

class TaskModel {
  String task;
  String time;

  TaskModel({required this.task, required this.time});

  factory TaskModel.fromJson(Map<String, dynamic> json) {
    return TaskModel(task: json['task'], time: json['time']);
  }

  Map<String, dynamic> toJson() {
    return {'task': task, 'time': time};
  }
}

List<TaskCategoryModel> datalist = [
  TaskCategoryModel(
    taskType: "To Do",
    taskTypeId: 0,
    data: [
      TaskModel(task: "Buy groceries", time: "5 PM"),
      TaskModel(task: "Buy fruits", time: "7 PM"),
      TaskModel(task: "Buy vegetables", time: "8 PM"),
      TaskModel(task: "Buy milk", time: "9 PM"),
      TaskModel(task: "Buy eggs", time: "10 PM"),
    ],
  ),
  TaskCategoryModel(
    taskType: "Done",
    taskTypeId: 1,
    data: [
      TaskModel(task: "Finish course", time: "5 PM"),
      TaskModel(task: "Clean room", time: "4 PM"),
    ],
  ),
  TaskCategoryModel(
    taskType: "Deleted",
    taskTypeId: 2,
    data: [],
  ),
];



