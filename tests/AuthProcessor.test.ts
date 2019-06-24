import {AuthProcessor} from "../src/AuthProcessor";

test("process to return an id", () => {
  const processor = new AuthProcessor();
  const response = processor.process( "some-id" );
  expect(response.id).toBe("some-id");
});
