// questions_screen.dart
import 'package:flutter/material.dart';
import 'package:flutterday2/jellybutton.dart';
import 'package:flutterday2/categoryscreen.dart';

class QuestionsScreen extends StatefulWidget {
  final List<Map> questions;
  final String title;

  const QuestionsScreen({
    super.key,
    required this.questions,
    required this.title,
  });

  @override
  State<QuestionsScreen> createState() => _QuestionsScreenState();
}

class _QuestionsScreenState extends State<QuestionsScreen> {
  int _currentIndex = 0;
  int _currentScore = 0;

  void showScoreDialog(BuildContext context, int score) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (_) {
        return Dialog(
          backgroundColor: Colors.transparent,
          insetPadding: const EdgeInsets.all(20),
          child: Container(
            padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 20),
            decoration: BoxDecoration(
              color: Colors.blue.shade600,
              borderRadius: BorderRadius.circular(20),
            ),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  "PAUSED",
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    letterSpacing: 2,
                  ),
                ),
                const SizedBox(height: 30),
                SizedBox(
                  width: 200,
                  height: 50,
                  child: JellyButton(
                    text: "RESTART",
                    onPressed: () {
                      Navigator.pop(context);
                      setState(() {
                        _currentScore = 0;
                        _currentIndex = 0;
                      });
                    },
                  ),
                ),
                const SizedBox(height: 10),
                SizedBox(
                  width: 200,
                  height: 50,
                  child: JellyButton(
                    text: "EXIT",
                    onPressed: () {
                      Navigator.pushAndRemoveUntil(
                        context,
                        MaterialPageRoute(
                          builder: (context) => CategoryScreen(),
                        ),
                        (route) => false,
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final quiz = widget.questions;

    return Scaffold(
      appBar: AppBar(
        centerTitle: true,
        title: Text(widget.title),
        backgroundColor: const Color.fromARGB(255, 54, 143, 244),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 12.0),
            child: Center(
              child: Text(
                "${_currentIndex + 1}/${quiz.length}",
                style: const TextStyle(fontSize: 22),
              ),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          const SizedBox(height: 20),
          Center(
            child: Text(
              "${quiz[_currentIndex]["question"]}",
              style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
          ),
          const SizedBox(height: 20),
          ListView.builder(
            shrinkWrap: true,
            itemCount: quiz[_currentIndex]["answers"].length,
            itemBuilder: (BuildContext context, int index) {
              return Padding(
                padding: const EdgeInsets.symmetric(
                  vertical: 8,
                  horizontal: 20,
                ),
                child: SizedBox(
                  width: double.infinity,
                  height: 60,
                  child: JellyButton(
                    text: "${quiz[_currentIndex]["answers"][index]["answer"]}",
                    onPressed: () {
                      _currentScore +=
                          quiz[_currentIndex]["answers"][index]["score"] as int;

                      if (_currentIndex + 1 == quiz.length) {
                        showScoreDialog(context, _currentScore);
                        return;
                      }

                      setState(() {
                        _currentIndex++;
                      });
                    },
                  ),
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
