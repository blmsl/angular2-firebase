import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
declare const tinymce: any;

@Component({
  selector: 'app-tinymce-textarea',
  templateUrl: './tinymce-textarea.component.html',
  styleUrls: ['./tinymce-textarea.component.scss']
})
export class TinymceTextareaComponent implements OnInit, AfterViewInit, OnDestroy {
  editor;
  @Input() elementId: String;
  @Output() onEditorKeyup = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table', 'textcolor'],
        skin_url: '../../../assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
      textcolor_map: [
        '000000', 'Black',
        '993300', 'Burnt orange',
        '333300', 'Dark olive',
        '003300', 'Dark green',
        '003366', 'Dark azure',
        '000080', 'Navy Blue',
        '333399', 'Indigo',
        '333333', 'Very dark gray',
        '800000', 'Maroon',
        'FF6600', 'Orange',
        '808000', 'Olive',
        '008000', 'Green',
        '008080', 'Teal',
        '0000FF', 'Blue',
        '666699', 'Grayish blue',
        '808080', 'Gray',
        'FF0000', 'Red',
        'FF9900', 'Amber',
        '99CC00', 'Yellow green',
        '339966', 'Sea green',
        '33CCCC', 'Turquoise',
        '3366FF', 'Royal blue',
        '800080', 'Purple',
        '999999', 'Medium gray',
        'FF00FF', 'Magenta',
        'FFCC00', 'Gold',
        'FFFF00', 'Yellow',
        '00FF00', 'Lime',
        '00FFFF', 'Aqua',
        '00CCFF', 'Sky blue',
        '993366', 'Red violet',
        'FFFFFF', 'White',
        'FF99CC', 'Pink',
        'FFCC99', 'Peach',
        'FFFF99', 'Light yellow',
        'CCFFCC', 'Pale green',
        'CCFFFF', 'Pale cyan',
        '99CCFF', 'Light sky blue',
        'CC99FF', 'Plum'
      ]
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

}
