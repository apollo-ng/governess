from ranges import range_overlap


def test_no_overlap():
    assert range_overlap([ (0.0, 1.0), (5.0, 6.0) ]) == None


def test_length_zero_overlap():
    assert range_overlap([ (0.0, 1.0), (1.0, 2.0) ]) == None


def test_single_range():
    assert range_overlap([ (0.0, 1.0) ]) == (0.0, 1.0)


def test_negative_range():
    assert range_overlap([ (0.0, 1.0), (0.0, 2.0),
                           (-1.0, 1.0) ]) == (0.0, 1.0)
