import React, { useState, useEffect, useRef } from "react";
import Search from "./Search";
import Hero from "./Hero.jsx";
import List from "./List.jsx";
import WatchList from "./Watch.jsx";
import CompletedList from "./Completed.jsx";
import { FaSearch } from "react-icons/fa";
import { PiStarFourFill } from "react-icons/pi";
import gsap from "gsap";
import { Toaster, toast } from "react-hot-toast";

const App = () => {
  const [topTenAnime, setTopTenAnime] = useState([]);
  const [search, setSearch] = useState(false);
  const [heroComp, setHeroComp] = useState(true);
  const [anime, setAnime] = useState([]);
  const [isXL, setIsXL] = useState(false);
  const [navAnimation, setNavAnimation] = useState(false);
  const [listView, setListView] = useState(false);
  const [watchingListView, setWatchingListView] = useState(false);
  const [completedListView, setCompletedListView] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const [watchingList, setWatchingList] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsXL(window.innerWidth >= 1280);
    };

    handleResize(); // Check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchAnime = async (search) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`);
    const data = await response.json();
    setAnime(data.data);
  };

  const animeSearch = (formData) => {
    const search = formData.get("search");
    setSearch(true);
    setHeroComp(false);
    fetchAnime(search);
    setNavAnimation(false);
    setListView(false);
    setWatchingListView(false);
    setCompletedListView(false);
  };

  const topFiveAnime = async () => {
    const response = await fetch(
      "https://api.jikan.moe/v4/top/anime?filter=airing&order_by=popularity&sort=asc&sfw"
    );
    const data = await response.json();
    setTopTenAnime(data.data.slice(0, 10));
  };

  useEffect(() => {
    topFiveAnime();
  }, []);

  const heroCompfunc = () => {
    setHeroComp(true);
    setSearch(false);
    setListView(false);
    setWatchingListView(false);
    setCompletedListView(false);
    setNavAnimation(false);
  };

  const listViewfunction = () => {
    setHeroComp(false);
    setSearch(false);
    setListView(true);
    setWatchingListView(false);
    setCompletedListView(false);
    setNavAnimation(false);
  };

  const watchingListViewfunction = () => {
    setHeroComp(false);
    setSearch(false);
    setListView(false);
    setWatchingListView(true);
    setCompletedListView(false);
    setNavAnimation(false);
  };

  const completedListViewfunction = () => {
    setHeroComp(false);
    setSearch(false);
    setListView(false);
    setWatchingListView(false);
    setCompletedListView(true);
    setNavAnimation(false);
  };
  const navRef = useRef(null);

  const navAni = () => {
    setNavAnimation(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavAnimation(false);
      }
    };

    if (navAnimation) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navAnimation]);

  useEffect(() => {
    if (navAnimation) {
      gsap.fromTo(
        navRef.current,
        {
          opacity: 0,
          duration: 0.5,
          xPercent: 100,
        },
        {
          opacity: 1,
          duration: 0.5,
          xPercent: 0,
        }
      );
    } else if (!navAnimation) {
      gsap.to(navRef.current, {
        opacity: 0,
        duration: 0.5,
        xPercent: 100,
      });
    }
  }, [navAnimation]);

  useEffect(() => {
    const storedWatchList = JSON.parse(localStorage.getItem("watchList")) || [];
    const storedWatchingList =
      JSON.parse(localStorage.getItem("watchingList")) || [];
    const storedCompletedList =
      JSON.parse(localStorage.getItem("completedList")) || [];
    setWatchList(storedWatchList);
    setWatchingList(storedWatchingList);
    setCompletedList(storedCompletedList);
  }, []);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
    localStorage.setItem("watchingList", JSON.stringify(watchingList));
    localStorage.setItem("completedList", JSON.stringify(completedList));
  }, [watchList, completedList, watchingList]);

  const addToWatchList = (anime) => {
    if (!watchList.some((a) => a.mal_id === anime.mal_id)) {
      const updatedWatchList = [...watchList, anime];
      setWatchList(updatedWatchList);
      localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    }
    toast.success("Added to Watch List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const addToWatchingList = (anime) => {
    if (!watchingList.some((a) => a.mal_id === anime.mal_id)) {
      const updatedWatchList = [...watchingList, anime];
      setWatchingList(updatedWatchList);
      localStorage.setItem("watchingList", JSON.stringify(updatedWatchList));
    }
    toast.success("Added to Watching List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const addToCompletedList = (anime) => {
    if (!completedList.some((a) => a.mal_id === anime.mal_id)) {
      const updatedCompletedList = [...completedList, anime];
      setCompletedList(updatedCompletedList);
      localStorage.setItem(
        "completedList",
        JSON.stringify(updatedCompletedList)
      );
    }

    removeFromWatchingList(anime);

    toast.success("Added to Completed List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const removeFromWatchList = (anime) => {
    const updatedWatchList = watchList.filter((a) => a.mal_id !== anime.mal_id);
    setWatchList(updatedWatchList);
    localStorage.setItem("watchList", JSON.stringify(updatedWatchList));
    toast.success("Removed from Watch List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const removeFromCompletedList = (anime) => {
    const updatedCompletedList = completedList.filter(
      (a) => a.mal_id !== anime.mal_id
    );
    setCompletedList(updatedCompletedList);
    localStorage.setItem("completedList", JSON.stringify(updatedCompletedList));
    toast.success("Removed from Completed List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  const removeFromWatchingList = (anime) => {
    const updatedWatchingList = watchingList.filter(
      (a) => a.mal_id !== anime.mal_id
    );
    setWatchingList(updatedWatchingList);
    localStorage.setItem("watchingList", JSON.stringify(updatedWatchingList));
    toast.success("Removed from Watching List", {
      duration: 1000,
      position: "center-center",
      style: {
        background: "#333",
        color: "#fff",
      },
    });
  };

  return (
    <>
      <Toaster />
      <main className="flex flex-col items-center justify-center overflow-y-auto">
        <div className="relative w-full h-[100dvh]">
          {isXL ? (
            <div className="flex items-center justify-between gap-4 w-full p-5 absolute top-0 left-0 z-100">
              <nav className="flex flex-row gap-5">
                <h1
                  className="text-2xl font-bold text-white cursor-pointer flex flex-row"
                  onClick={heroCompfunc}
                >
                  Ani
                  <PiStarFourFill className="text-[#8b2abf] text-4xl transform rotate-45" />
                </h1>
                <h1
                  className={`text-2xl cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200 ${
                    listView ? "text-[#8b2abf]" : "text-white"
                  }`}
                  onClick={listViewfunction}
                >
                  MyAnimeList
                </h1>
                <h1
                  className={`text-2xl cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200 ${
                    watchingListView ? "text-[#8b2abf]" : "text-white"
                  }`}
                  onClick={watchingListViewfunction}
                >
                  Watching
                </h1>
                <h1
                  className={`text-2xl cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200 ${
                    completedListView ? "text-[#8b2abf]" : "text-white"
                  }`}
                  onClick={completedListViewfunction}
                >
                  Completed
                </h1>
              </nav>
              <form
                action={animeSearch}
                className="flex items-center gap-2 w-2/3 justify-between lg:w-1/3"
              >
                <input
                  name="search"
                  id="search"
                  type="search"
                  placeholder="Search"
                  className="border-2 border-gray-300 rounded-full p-3 outline-none w-full text-white"
                  autoComplete="off"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#8b2abf] text-white p-4 rounded-full hover:bg-[#45155e] transition-all duration-200"
                >
                  <FaSearch />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex justify-between gap-4 w-full p-5 absolute top-0 left-0 z-100">
              <h1
                className="text-2xl font-bold text-white cursor-pointer"
                onClick={heroCompfunc}
              >
                <PiStarFourFill className="text-[#8b2abf] text-4xl transform rotate-45" />
              </h1>

              {navAnimation ? (
                <nav
                  ref={navRef}
                  className="flex flex-col gap-5 w-2/3 md:w-1/3 h-[95vh] fixed top-5 right-5 z-100"
                >
                  <div className="flex flex-row gap-5 w-full justify-between">
                    <form
                      action={animeSearch}
                      className="flex gap-5 justify-between w-full h-[48px]"
                    >
                      <input
                        name="search"
                        id="search"
                        type="search"
                        placeholder="Search"
                        className="border-2 border-gray-300 rounded-full p-3 outline-none w-full text-white"
                        autoComplete="off"
                        required
                      />
                      <button
                        type="submit"
                        className="bg-[#8b2abf] text-white p-4 rounded-full hover:bg-[#45155e] transition-all duration-200"
                      >
                        <FaSearch />
                      </button>
                    </form>
                  </div>
                  <div className="flex flex-col gap-5 h-full p-5 bg-white/10 backdrop-blur border border-white/20 shadow-lg rounded-lg">
                    <h1
                      className="text-xl text-white cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200"
                      onClick={listViewfunction}
                    >
                      MyAnimeList
                    </h1>
                    <h1
                      className="text-xl text-white cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200"
                      onClick={watchingListViewfunction}
                    >
                      Watching
                    </h1>
                    <h1
                      className="text-xl text-white cursor-pointer font-semibold hover:text-[#8b2abf] transition-all duration-200"
                      onClick={completedListViewfunction}
                    >
                      Completed
                    </h1>
                  </div>
                </nav>
              ) : (
                <button
                  onClick={navAni}
                  className="bg-[#8b2abf] text-white p-4 rounded-full hover:bg-[#45155e] transition-all duration-200"
                >
                  <FaSearch />
                </button>
              )}
            </div>
          )}
          {heroComp && (
            <Hero
              topTenAnime={topTenAnime}
              addToWatchList={addToWatchList}
              addToWatchingList={addToWatchingList}
              addToCompletedList={addToCompletedList}
            />
          )}
          {search && (
            <Search
              anime={anime}
              addToWatchList={addToWatchList}
              addToCompletedList={addToCompletedList}
              addToWatchingList={addToWatchingList}
            />
          )}
          {listView && (
            <List
              watchList={watchList}
              removeFromWatchList={removeFromWatchList}
              addToWatchingList={addToWatchingList}
            />
          )}
          {watchingListView && (
            <WatchList
              watchingList={watchingList}
              addToCompletedList={addToCompletedList}
            />
          )}
          {completedListView && (
            <CompletedList
              completedList={completedList}
              removeFromCompletedList={removeFromCompletedList}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default App;
