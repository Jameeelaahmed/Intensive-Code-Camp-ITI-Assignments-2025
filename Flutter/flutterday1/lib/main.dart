import 'package:flutter/material.dart';

void main() {
  runApp(const MyCustomCounterApp());
}

class MyCustomCounterApp extends StatelessWidget {
  const MyCustomCounterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Custom Counter',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(primarySwatch: Colors.pink),
      home: const CustomCounterHomePage(),
    );
  }
}

class CustomCounterHomePage extends StatefulWidget {
  const CustomCounterHomePage({super.key});

  @override
  State<CustomCounterHomePage> createState() => _CustomCounterHomePageState();
}

class _CustomCounterHomePageState extends State<CustomCounterHomePage> {
  int _counter = 0;

  void _increment() {
    if (_counter < 10) {
      setState(() => _counter++);
    } else {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("You can't go above 10")));
    }
  }

  void _decrement() {
    if (_counter > 0) {
      setState(() => _counter--);
    }
  }

  @override
  Widget build(BuildContext context) {
    final bool canIncrement = _counter < 10;
    final bool canDecrement = _counter > 0;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Custom Counter App'),
        backgroundColor: Colors.pink.shade400,
        centerTitle: true,
        elevation: 6,
        shadowColor: Colors.pinkAccent,
        leading: const Icon(Icons.favorite, color: Colors.white),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            colors: [Color(0xFFFFC1E3), Color(0xFFEC407A)],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        child: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  'Custom Counter',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.9),
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    letterSpacing: 1.2,
                  ),
                ),
                const SizedBox(height: 40),
                Text(
                  '$_counter',
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 72,
                    fontWeight: FontWeight.bold,
                    shadows: [
                      Shadow(
                        color: Colors.black38,
                        blurRadius: 8,
                        offset: Offset(2, 2),
                      ),
                    ],
                  ),
                ),
                if (_counter > 5)
                  Padding(
                    padding: const EdgeInsets.only(top: 12.0),
                    child: Text(
                      'Great progress!',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.85),
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton(
                      onPressed: canDecrement ? _decrement : null,
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                            canDecrement ? Colors.white : Colors.white54,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 14,
                        ),
                        elevation: 6,
                        shadowColor: Colors.black45,
                      ),
                      child: Icon(
                        Icons.remove_circle_outline,
                        color:
                            canDecrement
                                ? Colors.pink.shade700
                                : Colors.pink.shade200,
                        size: 32,
                      ),
                    ),
                    const SizedBox(width: 30),
                    ElevatedButton(
                      onPressed: _increment,
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                            canIncrement ? Colors.white : Colors.white54,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(20),
                        ),
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 14,
                        ),
                        elevation: 6,
                        shadowColor: Colors.black45,
                      ),
                      child: Icon(
                        Icons.add_circle_outline,
                        color:
                            canIncrement
                                ? Colors.pink.shade700
                                : Colors.pink.shade200,
                        size: 32,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
