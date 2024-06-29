import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { ADMIN_NAME } from '../types/Constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  adminName : string = '';
  constructor(private storageService : StorageService) { }

  ngOnInit(): void {
    this.adminName = this.storageService.fetchItemFromCache(ADMIN_NAME);
  }


}
