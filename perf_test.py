import requests
from timer import Timer
import pymysql
import numpy


collection = [
    "Chemia",
    "Chemia organiczna",
    "Chemia jądrowa",
    "Chemia nieorganiczna",
    "Chemia (zespół muzyczny)",
    "Chemia fizyczna",
    "WIG-chemia",
    "Wydział Chemii Uniwersytetu Mikołaja Kopernika w Toruniu",
    "Chemia kwantowa",
    "Chemia teoretyczna",
]

def calculate_correctness(base, own):
    sum = 0
    if len(base) != len(own):
        raise AssertionError("Different lengths")

    for i in range(len(base)):
        element = base[i]
        if element not in own:
            sum += len(own)
            continue
        idx = own.index(element)
        sum += numpy.abs(i - idx)
    return -sum


        

        


def test_1_es():
    for i in range(0, 100):
        requests.post(
            "http://localhost:9200/_search",
            json={
                "query": {"match": {"text": {"query": "sport"}}},
                "from": i,
                "size": 10,
            },
            timeout=2.50,
        )


def test_1_solr():
    for i in range(0, 100):
        requests.post(
            "http://localhost:8983/solr/wiki_conf/select",
            data={"q": 'text:"sport"', "start": i, "rows": 10},
            timeout=2.50,
        )


def test_1_sphinx():
    for i in range(0, 100):
        db = pymysql.connect(
            host="localhost", port=9306, user="root", passwd="", charset="utf8", db=""
        )
        cur = db.cursor()
        sql = f"SELECT j, weight() FROM plwiki WHERE MATCH('@(text) sport') LIMIT {i},10;"
        cur.execute(sql)
        cur.fetchall()


def test_2_es():
    for i in range(0, 100):
        requests.post(
            "http://localhost:9200/_search",
            json={
                "sort" : [
                        { "contributor" : "desc"}
                    ],
                "query": {
                    "bool": {
                    "must": [
                        {
                        "match": {
                            "text": "Departament"
                        }
                        },
                        {
                        "match": {
                            "title": "Sprawiedliwości"
                        }
                        },
                        {
                        "range": {
                            "datetime": {
                            "gte": 1233442800,
                            "lte": 1548979200
                            }
                        }
                        }
                    ]
                    }
                },
                "from": 0,
                "size": 10
                },
            timeout=2.50,
        )


def test_2_solr():
    for i in range(0, 100):
        requests.post(
            "http://localhost:8983/solr/wiki_conf/select",
            data={
                "q": 'text: "Departament" && title: "Sprawiedliwości" && datetime: ["2009-02-01T00:00:00Z" TO "2019-02-01T00:00:00Z"]',
                "start": 0,
                "rows": 10,
                "sort": "contributor desc",
            },
            timeout=2.5,
        )


def test_2_sphinx():
    for i in range(0, 100):
        db = pymysql.connect(
            host="localhost", port=9306, user="root", passwd="", charset="utf8", db=""
        )
        cur = db.cursor()
        sql = f"""SELECT
            j.title,
            j.text,
            weight()
        FROM plwiki
        WHERE
            MATCH('@(text) Departament && @(title) Sprawiedliwości') AND
            j.date BETWEEN 1233442800 AND 1548979200
        ORDER BY j.contributor DESC
        LIMIT 0,10;"""
        cur.execute(sql)
        cur.fetchall()

def test_3_es():
    res = requests.post(
        "http://localhost:9200/_search",
        json={
            "query": {"match": {"text": {"query": "chemia"}}},
            "from": 0,
            "size": 25,
        },
        timeout=2.50,
    )
    hits = [hit for hit in res.json()["hits"]["hits"] if "Kategoria" not in hit["_source"]["title"] and "Wikiprojekt" not in hit["_source"]["title"]][0:10]
    scores = [hit["_score"] for hit in hits]
    min_score = min(scores)
    max_score = max(scores)
    ranges = max_score - min_score
    return (
        [((hit["_score"] - min_score) / ranges, hit["_source"]["title"]) for hit in hits],
        numpy.min([ (hit["_score"] - min_score) / ranges for hit in hits]),
        numpy.max([ (hit["_score"] - min_score) / ranges for hit in hits]),
         numpy.mean([ (hit["_score"] - min_score) / ranges for hit in hits]),
         numpy.std([ (hit["_score"] - min_score) / ranges for hit in hits]),
         calculate_correctness(collection, [hit["_source"]["title"] for hit in hits])
         )


def test_3_solr():
    res = requests.post(
        "http://localhost:8983/solr/wiki_conf/select",
        data={"q": 'text:"chemia"', "start": 0, "rows": 25, "fl":"*,score"},
        timeout=2.50,
    )
    hits = [hit for hit in res.json()["response"]["docs"] if "Kategoria" not in hit["title"] and "Wikiprojekt" not in hit["title"]][0:10]
    scores = [hit["score"] for hit in hits]
    min_score = min(scores)
    max_score = max(scores)
    ranges = max_score - min_score
    return (
        [((hit["score"] - min_score) / ranges, hit["title"]) for hit in hits],
         numpy.min([ (hit["score"] - min_score) / ranges for hit in hits]),
        numpy.max([ (hit["score"] - min_score) / ranges for hit in hits]),
         numpy.mean([ (hit["score"] - min_score) / ranges for hit in hits]),
         numpy.std([ (hit["score"] - min_score) / ranges for hit in hits]),
         calculate_correctness(collection, [hit["title"] for hit in hits])
        )
    

def test_3_sphinx():
    db = pymysql.connect(
        host="localhost", port=9306, user="root", passwd="", charset="utf8", db=""
    )
    cur = db.cursor()
    sql = f"SELECT weight(), j.title FROM plwiki WHERE MATCH('@(text) chemia') LIMIT 0,30;"
    cur.execute(sql)
    res = cur.fetchall()

    hits = [hit for hit in res if "Kategoria" not in hit[1] and "Wikiprojekt" not in hit[1] and "Szablon" not in hit[1] and "Wikipedia" not in hit[1]][0:10]
    scores = [hit[0] for hit in hits]
    min_score = min(scores)
    max_score = max(scores)
    ranges = max_score - min_score

    

    return (
        [((hit[0] - min_score) / ranges, hit[1]) for hit in hits],
         numpy.min([ (hit[0] - min_score) / ranges for hit in hits]),
        numpy.max([ (hit[0] - min_score) / ranges for hit in hits]),
         numpy.mean([ (hit[0] - min_score) / ranges for hit in hits]),
         numpy.std([ (hit[0] - min_score) / ranges for hit in hits]),
         calculate_correctness(collection, [hit[1] for hit in hits])
        )



def main(engine):
    test_map = {
        "ES": (test_1_es, test_2_es, test_3_es),
        "SOLR": (test_1_solr, test_2_solr, test_3_solr),
        "SPHINX": (test_1_sphinx, test_2_sphinx, test_3_sphinx),
    }

    test_1, test_2, test_3 = test_map[engine]

    timer_1 = Timer(f"{engine}-Test1")
    for i in range(10):
        test_1()  # Warmup
        with timer_1.measure(str(i)):
            test_1()
    timer_1.accumulated()

    timer_2 = Timer(f"{engine}-Test2")
    for i in range(10):
        test_2()  # Warmup
        with timer_2.measure(str(i)):
            test_2()
    timer_2.accumulated()

    hits, min, max, mean,std, corectness = test_3()
    print("\n".join([f"{hit[0]}, {hit[1]}" for hit in hits]))
    print(min)
    print(max)
    print(std)
    print(mean)
    print(corectness)


if __name__ == "__main__":
    main("ES")
    main("SOLR")
    main("SPHINX")
