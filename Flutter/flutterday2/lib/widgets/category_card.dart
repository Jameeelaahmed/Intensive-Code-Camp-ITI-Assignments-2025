import 'package:flutter/material.dart';
import 'package:flutterday2/jellybutton.dart';
import 'package:flutterday2/questions_screen.dart';
import 'package:flutterday2/data/quiz_app_data.dart';

class CategoryCard extends StatelessWidget {
  const CategoryCard({super.key, this.color, this.title});
  final Color? color;
  final String? title;

  @override
  Widget build(BuildContext context) {
    List<Map> selectedQuestions = [];

    if (title == "Math Quiz") {
      selectedQuestions = mathQuiz;
    } else if (title == "IQ Quiz") {
      selectedQuestions = iqQuiz;
    } else if (title == "Art Quiz") {
      selectedQuestions = artQuiz;
    }

    return Expanded(
      child: Container(
        color: color,
        child: Center(
          child: Container(
            padding: EdgeInsets.symmetric(horizontal: 20, vertical: 10),
            decoration: BoxDecoration(
              color: Color.fromRGBO(230, 152, 32, 1),
              borderRadius: BorderRadius.circular(12),
            ),
            child: SizedBox(
              height: 40,
              width: 200,
              child: JellyButton(
                text: title ?? "Category",
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder:
                          (context) => QuestionsScreen(
                            questions: selectedQuestions,
                            title: title ?? "Quiz",
                          ),
                    ),
                  );
                },
              ),
            ),
          ),
        ),
      ),
    );
  }
}
