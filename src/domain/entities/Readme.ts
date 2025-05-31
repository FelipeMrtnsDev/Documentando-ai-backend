export class Readme {
  public readonly id: string;
  public readonly userId: string;
  public readonly title: string;
  public readonly stats: string;
  public readonly description: string;
  public readonly template: string;
  public readonly tag: string;

  constructor(props: {
    id: string;
    userId: string;
    title: string;
    stats: string;
    description: string;
    template: string;
    tag: string;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.stats = props.stats;
    this.description = props.description;
    this.template = props.template;
    this.tag = props.tag;
  }
}
