import 'package:flutter/material.dart';
import 'package:flutter_slidable/flutter_slidable.dart';
import 'package:todoapp/data/app_data.dart';
import 'package:todoapp/widgets/task_container.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;
  final _timeTextController = TextEditingController();
  final _taskTextController = TextEditingController();
  final formKey = GlobalKey<FormState>();

  void setStatter() {
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: Visibility(
        visible: _selectedIndex == 0,
        child: FloatingActionButton(
          onPressed: () {
            showTaskDialog(context);
          },
          backgroundColor: Colors.pink.shade400,
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
      backgroundColor: Colors.pink.shade50,
      appBar: AppBar(
        title: const Text('Barbie To-Do 💕'),
        centerTitle: true,
        backgroundColor: Colors.pink.shade300,
      ),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: SingleChildScrollView(
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 10.0),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    for (int i = 0; i < datalist.length; i++)
                      GestureDetector(
                        onTap: () {
                          setState(() {
                            _selectedIndex = i;
                          });
                        },
                        child: Container(
                          margin: const EdgeInsets.symmetric(horizontal: 8.0),
                          child: Center(
                            child: Text(
                              datalist[i].taskType,
                              style: TextStyle(
                                color:
                                    _selectedIndex == i
                                        ? Colors.white
                                        : Colors.pink.shade700,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          height: 40,
                          width: 100,
                          decoration: BoxDecoration(
                            color:
                                _selectedIndex == i
                                    ? Colors.pink.shade300
                                    : Colors.white,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: Colors.pink.shade200),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              Column(
                children: [
                  for (int i = 0; i < datalist[_selectedIndex].data.length; i++)
                    Slidable(
                      endActionPane: ActionPane(
                        motion: const ScrollMotion(),
                        children: [
                          if (_selectedIndex != 1)
                            SlidableAction(
                              onPressed: (context) {
                                setState(() {
                                  if (_selectedIndex == 0) {
                                    datalist[2].data.add(
                                      TaskModel(
                                        task:
                                            datalist[_selectedIndex]
                                                .data[i]
                                                .task,
                                        time:
                                            datalist[_selectedIndex]
                                                .data[i]
                                                .time,
                                      ),
                                    );
                                    datalist[_selectedIndex].data.removeAt(i);
                                  } else {
                                    datalist[0].data.add(
                                      TaskModel(
                                        task:
                                            datalist[_selectedIndex]
                                                .data[i]
                                                .task,
                                        time:
                                            datalist[_selectedIndex]
                                                .data[i]
                                                .time,
                                      ),
                                    );
                                    datalist[2].data.removeAt(i);
                                  }
                                });
                              },
                              backgroundColor:
                                  _selectedIndex == 2
                                      ? Colors.green
                                      : Colors.pink.shade300,
                              foregroundColor: Colors.white,
                              icon:
                                  _selectedIndex == 2
                                      ? Icons.restore
                                      : Icons.delete,
                              label: _selectedIndex == 2 ? "Restore" : "Delete",
                              borderRadius: BorderRadius.circular(20),
                            ),
                          if (_selectedIndex == 0)
                            SlidableAction(
                              onPressed: (context) {
                                showTaskDialog(context, index: i);
                              },
                              backgroundColor: Colors.pink.shade300,
                              foregroundColor: Colors.white,
                              icon: Icons.edit,
                              label: "Update",
                              borderRadius: BorderRadius.circular(20),
                            ),
                        ],
                      ),
                      child: TaskContainer(
                        task: datalist[_selectedIndex].data[i].task,
                        time: datalist[_selectedIndex].data[i].time,
                        taskTypeId: datalist[_selectedIndex].taskTypeId,
                        currentIndex: i,
                        upperWidgetState: setStatter,
                      ),
                    ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Future<void> showTaskDialog(BuildContext context, {int? index}) {
    if (index != null) {
      _taskTextController.text = datalist[_selectedIndex].data[index].task;
      _timeTextController.text = datalist[_selectedIndex].data[index].time;
    } else {
      _taskTextController.clear();
      _timeTextController.clear();
    }

    return showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text("${index == null ? "Add" : "Update"} Task"),
          content: Form(
            key: formKey,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  controller: _taskTextController,
                  decoration: const InputDecoration(hintText: "Task name"),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return "Please enter the task name";
                    }
                    return null;
                  },
                ),
                InkWell(
                  onTap: () async {
                    var selectedTime = await showTimePicker(
                      context: context,
                      initialTime: TimeOfDay.now(),
                    );
                    if (selectedTime != null) {
                      _timeTextController.text = selectedTime.format(context);
                    }
                  },
                  child: TextFormField(
                    controller: _timeTextController,
                    enabled: false,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return "Please enter the task time";
                      }
                      return null;
                    },
                    decoration: const InputDecoration(hintText: "Task time"),
                  ),
                ),
              ],
            ),
          ),
          actionsAlignment: MainAxisAlignment.spaceBetween,
          actions: [
            ElevatedButton(
              onPressed: () {
                if (formKey.currentState!.validate()) {
                  if (index == null) {
                    setState(() {
                      datalist[0].data.add(
                        TaskModel(
                          task: _taskTextController.text,
                          time: _timeTextController.text,
                        ),
                      );
                    });
                  } else {
                    setState(() {
                      datalist[0].data[index].task = _taskTextController.text;
                      datalist[0].data[index].time = _timeTextController.text;
                    });
                  }
                  Navigator.pop(context);
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.pink.shade300,
              ),
              child: Text(index == null ? "Save" : "Update"),
            ),
            OutlinedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              style: OutlinedButton.styleFrom(
                side: BorderSide(color: Colors.pink.shade300),
              ),
              child: Text(
                "Cancel",
                style: TextStyle(color: Colors.pink.shade300),
              ),
            ),
          ],
        );
      },
    );
  }
}
