describe('my first test', () => {
  let systemUnderTest;


  // resets the variables back to blank before each test
  beforeEach(() => {

    systemUnderTest = {};

  });

  it('should be true if true', () => {
    // arrange
    systemUnderTest.a = false;

    // act
    systemUnderTest.a = true;

    // assert
    expect(systemUnderTest.a).toBe(true);

  });


});
