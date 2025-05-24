import 'package:flutter/material.dart';
import '../data/app_data.dart';

class TaskContainer extends StatefulWidget {
  final String task;
  final String time;
  final int taskTypeId;
  final int currentIndex;
  final Function upperWidgetState;

  const TaskContainer({
    super.key,
    required this.task,
    required this.time,
    required this.taskTypeId,
    required this.currentIndex,
    required this.upperWidgetState,
  });

  @override
  State<TaskContainer> createState() => _TaskContainerState();
}

class _TaskContainerState extends State<TaskContainer> {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 12),
      decoration: BoxDecoration(
        color: Colors.pink.shade50,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.pink.shade200, width: 2),
        boxShadow: [
          BoxShadow(
            color: Colors.pink.shade100,
            blurRadius: 6,
            offset: const Offset(2, 2),
          ),
        ],
      ),
      padding: const EdgeInsets.all(20),
      child: Row(
        children: [
          if (widget.taskTypeId == 0 || widget.taskTypeId == 1)
            Checkbox(
              activeColor: Colors.pink,
              value: widget.taskTypeId == 1,
              onChanged: (value) {
                if (widget.taskTypeId == 0) {
                  var task = datalist[0].data[widget.currentIndex];
                  datalist[0].data.removeAt(widget.currentIndex);
                  datalist[1].data.add(task);
                  widget.upperWidgetState();
                }
              },
            ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.task,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.pink.shade700,
                    decoration:
                        widget.taskTypeId == 1
                            ? TextDecoration.lineThrough
                            : TextDecoration.none,
                  ),
                ),
                const SizedBox(height: 8),
                Row(
                  children: [
                    Icon(Icons.access_time, size: 16, color: Colors.pink),
                    const SizedBox(width: 4),
                    Text(
                      widget.time,
                      style: TextStyle(
                        color: Colors.pink.shade600,
                        fontSize: 14,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
