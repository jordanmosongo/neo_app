export class Helpers {
  static getPhotoUrl(photoUrl) {
    if (photoUrl && photoUrl !== '') {
      return photoUrl
    }
    return '';  
  }
}
