import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataBaseDataService } from '../_services/db-data.service';
import { ImageDataService } from '../_services/image-data.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  image: any;
  imageDate: any;
  likedList: any;
  loading: boolean

  constructor(private imgService: ImageDataService, private dbService: DataBaseDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.imageDate = this.route.snapshot.paramMap.get('date');
    this.loading = true;

    this.imgService.getImage(this.imageDate).subscribe(data => {
      this.image = data
      this.loading = false;
    },
    err => {
      console.log(err)
      this.router.navigate(['/notFound'])
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
}
