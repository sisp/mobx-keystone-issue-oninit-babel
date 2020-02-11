import { model, Model } from "mobx-keystone";

describe("onInit call", () => {
  let called = false;
  beforeEach(() => {
    called = false;
  });

  function createA() {
    return new A({});
  }

  @model("A")
  class A extends Model({}) {
    onInit() {
      called = true;
    }

    create() {
      return new A({});
    }

    createWithFactory() {
      return createA(); // should be no different than `create`, but it is :-/
    }
  }

  const a = new A({});
  expect(called).toBeTruthy();

  test("use create method", () => {
    a.create();
    expect(called).toBeTruthy();
  });

  test("use createWithFactory method", () => {
    a.createWithFactory();
    expect(called).toBeTruthy();
  });
});
