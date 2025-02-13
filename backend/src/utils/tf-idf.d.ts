declare module "tf-idf" {
  class TfIdf {
    constructor();
    addDocument(text: string): void;
    documents: number[][];
  }
  export { TfIdf };
}
