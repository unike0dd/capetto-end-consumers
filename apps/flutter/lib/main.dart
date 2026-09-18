import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const CappetoConsumerApp());
}

class CappetoConsumerApp extends StatelessWidget {
  const CappetoConsumerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Cappeto',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF356859)),
        useMaterial3: true,
      ),
      home: Scaffold(
        body: SafeArea(
          child: Center(
            child: Semantics(
              header: true,
              child: Text('Cappeto consumer migration shell'),
            ),
          ),
        ),
      ),
    );
  }
}
