import 'package:flutter/material.dart';
import 'package:frontend/utilities/theme.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'utilities/dependencies.dart' as dependencies;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Memo App',
      theme: customTheme,
      debugShowCheckedModeBanner: false,
      initialBinding: dependencies.InitialBindings(),
      // home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
