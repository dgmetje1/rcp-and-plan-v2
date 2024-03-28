export class ExampleApplication {
  postExample(body: any) {
    throw new Error();
  }
  getData() {
    return [];
  }
  getDataById(id: number) {
    return { id: 1, name: "hello" };
  }
}
