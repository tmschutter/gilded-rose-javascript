export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class LegendaryItem extends Item {
  uniqueUpdate(){
    return 'This is legendary'
  }
}

export class AgedItem extends Item {
  uniqueUpdate(){
    this.sellIn --
    if (this.quality < 50){
      this.quality ++
    }
  }
}

export class Ticket extends Item {
  uniqueUpdate(){
    this.sellIn--
    if (this.sellIn < 1){
      this.quality = 0
    } else if (this.quality < 50){
      if (this.sellIn <= 5){
        this.quality += 3
      } else if (this.sellIn <= 10){
        this.quality += 2
      } else {
        this.quality++
      }
    }
  }
}

export class ConjuredItem extends Item {
  uniqueUpdate(){
    this.sellIn--
    if (this.quality > 0){
      if (this.sellIn < 0){
        this.quality -= 4
        if (this.quality < 0) this.quality = 0
      } else {
        this.quality -= 2
      }
    }
  }
}

export let items = [];

items.push(new Item("+5 Dexterity Vest", 10, 20));
items.push(new AgedItem("Aged Brie", 2, 0));
items.push(new Item("Elixir of the Mongoose", 5, 7));
items.push(new LegendaryItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new Ticket("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new ConjuredItem("Conjured Mana Cake", 3, 6));

export const updateQuality = () => {
  for (let item of items) {
    if (item.uniqueUpdate){
      item.uniqueUpdate()
    } else {
      item.sellIn--
      if (item.quality > 0){
        if (item.sellIn < 0){
          item.quality -= 2
          if (item.quality < 0) item.quality = 0
        } else {
          item.quality--
        }
      }
    }
  }
};
