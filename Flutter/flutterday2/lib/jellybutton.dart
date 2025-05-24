import 'package:flutter/material.dart';

class JellyButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const JellyButton({required this.text, required this.onPressed, super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onPressed,
      child: Stack(
        children: [
          Container(
            width: double.infinity,
            height: 40,
            decoration: BoxDecoration(
              color: Color.fromRGBO(230, 152, 32, 1),
              borderRadius: BorderRadius.circular(45),
            ),
          ),
          Positioned(
            top: 7,
            left: 22,
            right: 22,
            child: Container(
              height: 2,
              decoration: BoxDecoration(
                color: Color.fromRGBO(250, 250, 250, 0.678),
                borderRadius: BorderRadius.circular(50),
                boxShadow: [
                  BoxShadow(
                    color: Color.fromRGBO(250, 250, 250, 0.678),
                    blurRadius: 1,
                  ),
                ],
              ),
            ),
          ),
          Positioned(
            bottom: 7,
            left: 22,
            right: 22,
            child: Container(
              height: 2,
              decoration: BoxDecoration(
                color: Color.fromRGBO(250, 250, 250, 0.137),
                borderRadius: BorderRadius.circular(50),
                boxShadow: [
                  BoxShadow(
                    color: Color.fromRGBO(250, 250, 250, 0.137),
                    blurRadius: 1,
                  ),
                ],
              ),
            ),
          ),
          Center(
            child: Padding(
              padding: const EdgeInsets.only(top: 16),
              child: Text(
                text,
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
