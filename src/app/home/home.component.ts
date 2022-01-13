import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ImageDataService } from '../_services/image-data.service';
import { DataBaseDataService } from '../_services/db-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageList: any;
  likedList: any;
  loading: boolean

  currentRow = 1;
  currentColumn = 0;

  constructor(private imgService: ImageDataService, private dbService: DataBaseDataService) { }

  ngOnInit() {
    this.loading = true;
    this.imgService.getImages().subscribe(data => {
      this.loading = false
      this.imageList = data
    })
    this.dbService.getLikedImages().subscribe(data => {
      this.likedList = data
    })
  }

  likeImage(image) {
    this.dbService.likeImage({date: image.date, title: image.title}).subscribe(msg => {
      this.dbService.getLikedImages().subscribe(data => {
        this.likedList = data
      })
    },
    (err) => {
      console.log(err)
    })
  }

  unlikeImage(date) {
    this.dbService.unlikeImage({date: date}).subscribe(msg => {
      this.dbService.getLikedImages().subscribe(data => {
        this.likedList = data
      })
    },
    (err) => {
      console.log(err)
    })
  }

  checkIfLiked(date) {
    if( this.likedList.filter((i) => { return i.date == date}).length > 0 ) {
      return true
    }

    return false
  }

  nextColumn() {
    this.currentColumn += 1
    if(this.currentColumn == 4) {
      this.nextRow()
    }
    return this.currentColumn
  }

  nextRow() {
    this.currentRow += 1;
    this.currentColumn = 0;
  }

}
