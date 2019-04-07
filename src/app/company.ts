export class Company {
  name: string;
  mainBranch: string;
  subBranches: string[];
  constructor(name: string, mainBranch: string, subBranches: string[]) {
    this.name = name;
    this.mainBranch = mainBranch;
    this.subBranches = subBranches;
  }
}
