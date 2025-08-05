//tamrin 1: بافرض اینکه آیدی ها از 1 به بالا شروع میشن ، مطئمن شو که وقتی از میگی آیدیش 15 باشه نره و همه رو بخونه و 15 رو بده و مستقیما 15 رو بده(لوپ نداشته باشه)
interface PersonInfo {
  name: string;
  id: number;
  age: number;
}
interface PersonPrimaryInfo {
  name: string;
  age: number;
}
abstract class PersonsList {
  abstract insert(p: PersonPrimaryInfo): Array<PersonInfo>;
  abstract getById(id: number): PersonInfo; //ids are sequential
  abstract getAll(): Array<PersonInfo>;
}
class Persons extends PersonsList {
  constructor(public list: Array<PersonInfo> = []) {
    super();
  }
  insert(p: PersonPrimaryInfo): Array<PersonInfo> {
    const newId = this.list.at(-1)?.id ? increament(this.list.at(-1)!.id) : 1;
    this.list = [...this.list, { ...p, id: newId }];
    return this.list;
  }
  //part1 assignment : O(n)
  /*getById(id: number): PersonInfo {
    const person = this.list.find((p) => p.id === id);
    if (!person) throw new Error("This id is not exist");
    return person;
  }
  getAll(): Array<PersonInfo> {
    return this.list;
  }
}*/
  //part2 assignment : O(1)
  getById(id: number): PersonInfo {
    const person = this.list.at(id - 1); // id is from [1,2,3,...] and list index is from [0,...]
    if (!person) throw new Error("This id is not exist");
    if (person.id === id) {
      return person;
    } else {
      throw new Error("This id is not exist");
    } //edge case:imagine when we accidently delete Person from our list so the next item would replace it and get its place(index of array) so to prevent from the error we have to check the if of the person with the its index(id that we call)
  }
  getAll(): Array<PersonInfo> {
    return this.list;
  }
}

const increament = (num: number): number => {
  return num + 1;
};
const user1: PersonPrimaryInfo = {
  name: "Ali",
  age: 45,
};
const user2: PersonPrimaryInfo = {
  name: "Mary",
  age: 5,
};
const dataBase = new Persons();
dataBase.insert(user1);
dataBase.insert(user2);
console.log(dataBase.getById(2));
console.log(dataBase.getAll());
