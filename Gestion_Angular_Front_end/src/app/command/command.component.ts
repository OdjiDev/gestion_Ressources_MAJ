
import { Component, OnInit } from '@angular/core';
import { CommandService } from './command.service';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

  command: string = 'dit status';
  output?: string;

  constructor(private commandService: CommandService) { }

  ngOnInit(): void { }

  executeCommand() {
    console.log('AVANT EXCECUTION');

    this.commandService.executeCommand(this.command)
      .subscribe(data => this.output = data, error => console.error(error));


      console.log('APRES EXCECUTION');
  }
}


//    .subscribe(data => this.output = data, error => console.error(error));

