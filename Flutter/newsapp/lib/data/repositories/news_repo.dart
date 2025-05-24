import 'package:dio/dio.dart';
import 'package:newsapp/data/modals/news_model.dart';
import 'package:newsapp/utils/constants.dart';

class NewsRepo {
  Future<NewsModel?> getNews() async {
    final dio = Dio();
    final response = await dio.get(
      baseUrl + getNewsEndpoint,
      queryParameters: {"q": "America", 'apiKey': apiKey},
    );
    if (response.statusCode == 200) {
      final modelResponse = NewsModel.fromJson(response.data);
      return modelResponse;
    } else {
      return null;
    }
  }
}
