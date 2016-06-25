def range_overlap(ranges):
    """Return common overlap among a set of [low, high] ranges"""
    lowest = ranges[0][0]
    highest = ranges[0][1]
    for (low, high) in ranges:
        lowest = max(lowest, low)
        highest = min(highest, high)
        if lowest >= highest:
            return None
        else:
            return (lowest, highest)
