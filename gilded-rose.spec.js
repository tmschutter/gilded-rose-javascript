import { expect, describe, it } from "vitest";
import { Item, items, updateQuality, LegendaryItem, AgedItem, Ticket, ConjuredItem } from "./gilded-rose.js";

describe("updateQuality", () => {
  it("Regular Item quality and sellIn is decreased by 1", () => {
    const testItem = new Item("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });

  it("Regular Item quality is decreased by 2  when sellIn < 0", () => {
    const testItem = new Item("basic", -2, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(1);
    expect(testItem.sellIn).toBe(-3);
  });

  it("Regular Item quality will not go below 0", () => {
    const testItem = new Item("basic", -2, 1);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-3);
  });

  it("Ticket quality improves by 1 if sellIn > 10", () => {
    const ticket1 = new Ticket("ticket", 12, 10);
    items.push(ticket1);

    updateQuality();

    expect(ticket1.quality).toBe(11);
    expect(ticket1.sellIn).toBe(11);
  });

  it("Ticket quality improves by 2 if 5 < sellIn <= 10", () => {
    const ticket1 = new Ticket("ticket", 8, 10);
    items.push(ticket1);

    updateQuality();

    expect(ticket1.quality).toBe(12);
    expect(ticket1.sellIn).toBe(7);
  });

  it("Ticket quality improves by 3 if sellIn <= 5", () => {
    const ticket1 = new Ticket("ticket", 3, 10);
    items.push(ticket1);

    updateQuality();

    expect(ticket1.quality).toBe(13);
    expect(ticket1.sellIn).toBe(2);
  });

  it("Ticket quality goes to 0 if sellIn <= 0", () => {
    const ticket1 = new Ticket("ticket", 0, 10);
    items.push(ticket1);

    updateQuality();

    expect(ticket1.quality).toBe(0);
    expect(ticket1.sellIn).toBe(-1);
  });

  it("LegendaryItem quality and sellIn are unaffected", () => {
    const testItem = new LegendaryItem("legendary", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(3);
    expect(testItem.sellIn).toBe(5);
  });

  it("AgedItem improves quality with time", () => {
    const testItem = new AgedItem("aged", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(4);
    expect(testItem.sellIn).toBe(4);
  });

  it("AgedItem quality will not go over 50", () => {
    const testItem = new AgedItem("aged", 5, 49);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(4);

    updateQuality();

    expect(testItem.quality).toBe(50);
    expect(testItem.sellIn).toBe(3);
  });

  it("ConjuredItem quality is decreased by 2", () => {
    const testItem = new ConjuredItem("conjured", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(1);
    expect(testItem.sellIn).toBe(4);
  });

  it("ConjuredItem quality is decreased by 4 when sellIn < 0", () => {
    const testItem = new ConjuredItem("conjured", -2, 5);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(1);
    expect(testItem.sellIn).toBe(-3);
  });

  it("ConjuredItem quality will not go below 0", () => {
    const testItem = new ConjuredItem("conjured", -2, 1);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem.sellIn).toBe(-3);
  });
});