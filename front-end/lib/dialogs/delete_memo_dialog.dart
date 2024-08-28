import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'utilities/dependencies.dart' as dependencies;

class DeleteMemoDialog extends StatefulWidget {
  final int index;
  final Function scrollBottom;
  const DeleteMemoDialog({super.key, required this.index, required this.scrollBottom});

  @override
  State<DeleteMemoDialog> createState() => _DeleteMemoDialogState();
}

class _DeleteMemoDialogState extends State<DeleteMemoDialog> {
  RxString status = 'delete-memo'.obs;
  var memoController = TextEditingController();

  Widget deleteMemoWidget(){
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const Text(
            "Delete this memo"
          ),
          const SizedBox(height: 20,),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ElevatedButton(
                  onPressed: () {
                    status.value == 'deleting-memo';
                  },
                  child: const Text('Delete'),
              ),
              const SizedBox(width: 20,),
              ElevatedButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: const Text('Cancel'),
              )
            ],
          )
        ],
      ),
    );
  }

Widget deletingMemoWidget() {
    return FutureBuilder(
        future:Get.find<dependencies.AutoController>().deleteMemo(
          widget.index,
        ),
        builder:(context, snapshot){
          if(snapshot.connectionState != ConnectionState.done){
            return const Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Deleting Memo'),
                  SizedBox(height: 20,),
                  CircularProgressIndicator(),
                ],
              ),
            );
          } else if(snapshot.data == 'success'){
            Future.delayed(
              const Duration(seconds: 1),
                () {
                if(Get.find<dependencies.AuthController>().memos.isNotEmpty) {
                  widget.scrollBottom();
                }
                Navigator.pop(context);
                },
            );
            return const Center(
              child:  Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Memo Deleted Successfully'),
                  SizedBox(height:  20,),
                  CircularProgressIndicator(),
                ],
              ),
            );
          } else{
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  // Text(snapshot.data!),
                  const SizedBox(height: 20,),
                  ElevatedButton(
                      onPressed: () {
                    Navigator.pop(context);
                  }, 
                      child: Text('Close')
                  )
                ],
              ),
            );
          }
        },
    );
}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:Obx(
          () => status.value == 'delete-memo'
              ? deleteMemoWidget()
              : status.value == 'delete-memo'
              ? deletingMemoWidget()
              : const SizedBox(),
      ),
    );
  }
  
  
}
