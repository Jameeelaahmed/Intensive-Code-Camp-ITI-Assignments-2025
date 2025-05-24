import 'package:flutter/material.dart';
import 'package:flutterday2/widgets/category_card.dart';

class CategoryScreen extends StatelessWidget {
  CategoryScreen({super.key});
  List<Map> data = [
    {"title": "Math Quiz", "color": Color.fromRGBO(65, 128, 234, 1)},
    {"title": "IQ Quiz", "color": Color.fromRGBO(65, 128, 234, 1)},
    {"title": "Art Quiz", "color": Color.fromRGBO(65, 128, 234, 1)},
  ];

  @override
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Color.fromRGBO(230, 152, 32, 1),
      body: Column(
        children: [
          for (int i = 0; i < data.length; i++)
            Expanded(
              child: Container(
                margin: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  border: Border.all(
                    color: const Color.fromRGBO(45, 81, 132, 1),
                    width: 20,
                  ),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: CategoryCard(
                  color: data[i]["color"],
                  title: data[i]["title"],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
