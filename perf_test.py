import requests
from timer import Timer
import pymysql


def test_1_es():
    for i in range(0, 1000):
        requests.post(
            "http://localhost:9200/_search",
            json={
                "query": {"match": {"title": {"query": "Justice"}}},
                "from": i,
                "size": 10,
            },
            timeout=2.50,
        )


def test_1_solr():
    for i in range(0, 1000):
        requests.post(
            "http://localhost:8983/solr/judge/select",
            data={"q": 'title%3A"Justice"', "start": i, "rows": 10},
            timeout=2.50,
        )


def test_1_sphinx():
    for i in range(0, 1000):
        db = pymysql.connect(
            host="localhost", port=9306, user="root", passwd="", charset="utf8", db=""
        )
        cur = db.cursor()
        sql = f"SELECT j, weight() FROM doj WHERE MATCH('@title Justice') LIMIT {i},10;"
        cur.execute(sql)
        cur.fetchall()


def test_2_es():
    for i in range(0, 1000):
        requests.post(
            "http://localhost:9200/_search",
            json={
                "query": {"match": {"title": {"query": "Justice"}}},
                "from": i,
                "size": 10,
            },
            timeout=2.50,
        )


def test_2_solr():
    for i in range(0, 100):
        requests.post(
            "http://localhost:8983/solr/judge/select",
            data={
                "q": 'contents%3A"WASHINGTON" %26%26 title%3A"Justice" %26%26 (components%3A "Office" || date%3A ["2009-02-01T00%3A00%3A00Z" TO "2009-03-01T00%3A00%3A00Z"])',
                "start": i,
                "rows": 10,
                "sort": "contents desc%2C title desc",
            },
            timeout=2.50,
        )


def test_2_sphinx():
    for i in range(0, 100):
        db = pymysql.connect(
            host="localhost", port=9306, user="root", passwd="", charset="utf8", db=""
        )
        cur = db.cursor()
        sql = f"""SELECT
            j.components,
            j.title,
            IN(j.components, 'Office of Public Affairs') + IN(j.components, 'Office of the Attorney General') AS ad,
            weight()
        FROM doj
        WHERE
            MATCH('@(contents) WASHINGTON && @(title) Justice') AND
            ad > 0 AND
            j.date BETWEEN 1233442800 AND 1235862000
        ORDER BY j.contents DESC, j.title DESC
        LIMIT {i},10;"""
        cur.execute(sql)
        cur.fetchall()


def main(engine):
    test_map = {
        "ES": (test_1_es, test_2_es, None),
        "SOLR": (test_1_solr, test_2_solr, None),
        "SPHINX": (test_1_sphinx, test_2_sphinx, None),
    }

    test_1, test_2, test_3 = test_map[engine]

    # timer_1 = Timer(f"{engine}-Test1")
    # for i in range(10):
    #     test_1()  # Warmup
    #     with timer_1.measure(str(i)):
    #         test_1()
    # timer_1.accumulated()

    timer_2 = Timer(f"{engine}-Test2")
    for i in range(10):
        test_2()  # Warmup
        with timer_2.measure(str(i)):
            test_2()
    timer_2.accumulated()
    # for i in range(10):
    #     with timer.measure("Test3"):
    #         test_3()


if __name__ == "__main__":
    # main("ES")
    main("SOLR")
    main("SPHINX")
