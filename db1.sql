PGDMP  -                	    {            postgres    16.0    16.0 5    %           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            &           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            '           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            (           1262    5    postgres    DATABASE     �   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE postgres;
                postgres    false            )           0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    4904                        3079    16384 	   adminpack 	   EXTENSION     A   CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;
    DROP EXTENSION adminpack;
                   false            *           0    0    EXTENSION adminpack    COMMENT     M   COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';
                        false    2            o           1247    16468    enum_profile_dosen_gender    TYPE     [   CREATE TYPE public.enum_profile_dosen_gender AS ENUM (
    'Laki-Laki',
    'Perempuan'
);
 ,   DROP TYPE public.enum_profile_dosen_gender;
       public          postgres    false            l           1247    16462    enum_user_account_role    TYPE     P   CREATE TYPE public.enum_user_account_role AS ENUM (
    'Admin',
    'Dosen'
);
 )   DROP TYPE public.enum_user_account_role;
       public          postgres    false            Z           1247    16411    gender_enum    TYPE     M   CREATE TYPE public.gender_enum AS ENUM (
    'Laki-Laki',
    'Perempuan'
);
    DROP TYPE public.gender_enum;
       public          postgres    false            T           1247    16398 	   role_enum    TYPE     C   CREATE TYPE public.role_enum AS ENUM (
    'Admin',
    'Dosen'
);
    DROP TYPE public.role_enum;
       public          postgres    false            �            1259    16432    education_history    TABLE     �   CREATE TABLE public.education_history (
    id_education_history integer NOT NULL,
    id_dosen integer,
    institution character varying(50) NOT NULL,
    degree character varying(50) NOT NULL,
    graduation_date date
);
 %   DROP TABLE public.education_history;
       public         heap    postgres    false            �            1259    16431 *   education_history_id_education_history_seq    SEQUENCE     �   CREATE SEQUENCE public.education_history_id_education_history_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 A   DROP SEQUENCE public.education_history_id_education_history_seq;
       public          postgres    false    223            +           0    0 *   education_history_id_education_history_seq    SEQUENCE OWNED BY     y   ALTER SEQUENCE public.education_history_id_education_history_seq OWNED BY public.education_history.id_education_history;
          public          postgres    false    222            �            1259    16448    pkm    TABLE     �   CREATE TABLE public.pkm (
    id_pkm integer NOT NULL,
    id_dosen integer,
    pkm_title character varying(150) NOT NULL,
    pkm_year date,
    partner_name character varying(150),
    description text,
    pkm_link text
);
    DROP TABLE public.pkm;
       public         heap    postgres    false            �            1259    16447    pkm_id_pkm_seq    SEQUENCE     �   CREATE SEQUENCE public.pkm_id_pkm_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.pkm_id_pkm_seq;
       public          postgres    false    227            ,           0    0    pkm_id_pkm_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.pkm_id_pkm_seq OWNED BY public.pkm.id_pkm;
          public          postgres    false    226            �            1259    16416    profile_dosen    TABLE     �  CREATE TABLE public.profile_dosen (
    id_dosen integer NOT NULL,
    profile_picture text,
    full_name character varying(50) NOT NULL,
    place_of_birth character varying(50),
    date_of_birth date,
    gender public.gender_enum,
    email character varying(100),
    bio text,
    id_user_account integer,
    major character varying(100),
    "position" character varying(100),
    study_program character varying(100)
);
 !   DROP TABLE public.profile_dosen;
       public         heap    postgres    false    858            �            1259    16415    profile_dosen_id_dosen_seq    SEQUENCE     �   CREATE SEQUENCE public.profile_dosen_id_dosen_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.profile_dosen_id_dosen_seq;
       public          postgres    false    219            -           0    0    profile_dosen_id_dosen_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.profile_dosen_id_dosen_seq OWNED BY public.profile_dosen.id_dosen;
          public          postgres    false    218            �            1259    16439    research    TABLE     �   CREATE TABLE public.research (
    id_research integer NOT NULL,
    id_dosen integer,
    research_title character varying(250) NOT NULL,
    publication_date date,
    doi_link text
);
    DROP TABLE public.research;
       public         heap    postgres    false            �            1259    16438    research_id_research_seq    SEQUENCE     �   CREATE SEQUENCE public.research_id_research_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.research_id_research_seq;
       public          postgres    false    225            .           0    0    research_id_research_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.research_id_research_seq OWNED BY public.research.id_research;
          public          postgres    false    224            �            1259    16425    teaching_history    TABLE     �   CREATE TABLE public.teaching_history (
    id_teaching_history integer NOT NULL,
    id_dosen integer,
    institution character varying(50) NOT NULL,
    "position" character varying(50),
    start_date date,
    end_date date
);
 $   DROP TABLE public.teaching_history;
       public         heap    postgres    false            �            1259    16424 (   teaching_history_id_teaching_history_seq    SEQUENCE     �   CREATE SEQUENCE public.teaching_history_id_teaching_history_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ?   DROP SEQUENCE public.teaching_history_id_teaching_history_seq;
       public          postgres    false    221            /           0    0 (   teaching_history_id_teaching_history_seq    SEQUENCE OWNED BY     u   ALTER SEQUENCE public.teaching_history_id_teaching_history_seq OWNED BY public.teaching_history.id_teaching_history;
          public          postgres    false    220            �            1259    16404    user_account    TABLE     �   CREATE TABLE public.user_account (
    id_user_account integer NOT NULL,
    nip character varying(50) NOT NULL,
    password character varying(25) NOT NULL,
    role public.role_enum
);
     DROP TABLE public.user_account;
       public         heap    postgres    false    852            �            1259    16403     user_account_id_user_account_seq    SEQUENCE     �   CREATE SEQUENCE public.user_account_id_user_account_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public.user_account_id_user_account_seq;
       public          postgres    false    217            0           0    0     user_account_id_user_account_seq    SEQUENCE OWNED BY     e   ALTER SEQUENCE public.user_account_id_user_account_seq OWNED BY public.user_account.id_user_account;
          public          postgres    false    216            y           2604    16435 &   education_history id_education_history    DEFAULT     �   ALTER TABLE ONLY public.education_history ALTER COLUMN id_education_history SET DEFAULT nextval('public.education_history_id_education_history_seq'::regclass);
 U   ALTER TABLE public.education_history ALTER COLUMN id_education_history DROP DEFAULT;
       public          postgres    false    223    222    223            {           2604    16451 
   pkm id_pkm    DEFAULT     h   ALTER TABLE ONLY public.pkm ALTER COLUMN id_pkm SET DEFAULT nextval('public.pkm_id_pkm_seq'::regclass);
 9   ALTER TABLE public.pkm ALTER COLUMN id_pkm DROP DEFAULT;
       public          postgres    false    226    227    227            w           2604    16419    profile_dosen id_dosen    DEFAULT     �   ALTER TABLE ONLY public.profile_dosen ALTER COLUMN id_dosen SET DEFAULT nextval('public.profile_dosen_id_dosen_seq'::regclass);
 E   ALTER TABLE public.profile_dosen ALTER COLUMN id_dosen DROP DEFAULT;
       public          postgres    false    219    218    219            z           2604    16442    research id_research    DEFAULT     |   ALTER TABLE ONLY public.research ALTER COLUMN id_research SET DEFAULT nextval('public.research_id_research_seq'::regclass);
 C   ALTER TABLE public.research ALTER COLUMN id_research DROP DEFAULT;
       public          postgres    false    224    225    225            x           2604    16428 $   teaching_history id_teaching_history    DEFAULT     �   ALTER TABLE ONLY public.teaching_history ALTER COLUMN id_teaching_history SET DEFAULT nextval('public.teaching_history_id_teaching_history_seq'::regclass);
 S   ALTER TABLE public.teaching_history ALTER COLUMN id_teaching_history DROP DEFAULT;
       public          postgres    false    220    221    221            v           2604    16407    user_account id_user_account    DEFAULT     �   ALTER TABLE ONLY public.user_account ALTER COLUMN id_user_account SET DEFAULT nextval('public.user_account_id_user_account_seq'::regclass);
 K   ALTER TABLE public.user_account ALTER COLUMN id_user_account DROP DEFAULT;
       public          postgres    false    217    216    217                      0    16432    education_history 
   TABLE DATA           q   COPY public.education_history (id_education_history, id_dosen, institution, degree, graduation_date) FROM stdin;
    public          postgres    false    223   �>       "          0    16448    pkm 
   TABLE DATA           i   COPY public.pkm (id_pkm, id_dosen, pkm_title, pkm_year, partner_name, description, pkm_link) FROM stdin;
    public          postgres    false    227   6?                 0    16416    profile_dosen 
   TABLE DATA           �   COPY public.profile_dosen (id_dosen, profile_picture, full_name, place_of_birth, date_of_birth, gender, email, bio, id_user_account, major, "position", study_program) FROM stdin;
    public          postgres    false    219   �@                  0    16439    research 
   TABLE DATA           e   COPY public.research (id_research, id_dosen, research_title, publication_date, doi_link) FROM stdin;
    public          postgres    false    225   OB                 0    16425    teaching_history 
   TABLE DATA           x   COPY public.teaching_history (id_teaching_history, id_dosen, institution, "position", start_date, end_date) FROM stdin;
    public          postgres    false    221   �B                 0    16404    user_account 
   TABLE DATA           L   COPY public.user_account (id_user_account, nip, password, role) FROM stdin;
    public          postgres    false    217   PC       1           0    0 *   education_history_id_education_history_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('public.education_history_id_education_history_seq', 5, true);
          public          postgres    false    222            2           0    0    pkm_id_pkm_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.pkm_id_pkm_seq', 1, true);
          public          postgres    false    226            3           0    0    profile_dosen_id_dosen_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.profile_dosen_id_dosen_seq', 2, true);
          public          postgres    false    218            4           0    0    research_id_research_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.research_id_research_seq', 2, true);
          public          postgres    false    224            5           0    0 (   teaching_history_id_teaching_history_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public.teaching_history_id_teaching_history_seq', 3, true);
          public          postgres    false    220            6           0    0     user_account_id_user_account_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('public.user_account_id_user_account_seq', 3, true);
          public          postgres    false    216            �           2606    16437 (   education_history education_history_pkey 
   CONSTRAINT     x   ALTER TABLE ONLY public.education_history
    ADD CONSTRAINT education_history_pkey PRIMARY KEY (id_education_history);
 R   ALTER TABLE ONLY public.education_history DROP CONSTRAINT education_history_pkey;
       public            postgres    false    223            �           2606    16455    pkm pkm_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pkm
    ADD CONSTRAINT pkm_pkey PRIMARY KEY (id_pkm);
 6   ALTER TABLE ONLY public.pkm DROP CONSTRAINT pkm_pkey;
       public            postgres    false    227                       2606    16423     profile_dosen profile_dosen_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.profile_dosen
    ADD CONSTRAINT profile_dosen_pkey PRIMARY KEY (id_dosen);
 J   ALTER TABLE ONLY public.profile_dosen DROP CONSTRAINT profile_dosen_pkey;
       public            postgres    false    219            �           2606    16446    research research_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.research
    ADD CONSTRAINT research_pkey PRIMARY KEY (id_research);
 @   ALTER TABLE ONLY public.research DROP CONSTRAINT research_pkey;
       public            postgres    false    225            �           2606    16430 &   teaching_history teaching_history_pkey 
   CONSTRAINT     u   ALTER TABLE ONLY public.teaching_history
    ADD CONSTRAINT teaching_history_pkey PRIMARY KEY (id_teaching_history);
 P   ALTER TABLE ONLY public.teaching_history DROP CONSTRAINT teaching_history_pkey;
       public            postgres    false    221            }           2606    16409    user_account user_account_pkey 
   CONSTRAINT     i   ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id_user_account);
 H   ALTER TABLE ONLY public.user_account DROP CONSTRAINT user_account_pkey;
       public            postgres    false    217               �   x��б
�0��9y�{�J�j��nű�.�%�^JL�_�������V���\�	������3˘eV������p	˚�ad�^�!.��gEƘ���>VPڃRAmm������2�`�=v�i�j�����~
��v�Z���|�      "   [  x��Q;O�0��_qb�$�J,��Z6�KrM]�����{Ύ��l��w�+�j]�I�3nR�5�<cTx#���#l��We{�|���F��GF�\um�޴7��ڑ.'{œ�=���1��.Y��#����^���!��#�LLFE%�3�=��NI��c�LBƓ����F�Ȏh�TG7�x�M�1��E�8���8���"�X�&�DGqQ�u�Š���C����
�+�K9Sq#�?~.y��8
fg�����Ψ�iʡ��K9F~�N��k��#�zf�C��'��F6��)�_���}Y��k�򋵺:�8�Ǧ$C�C�t��ͺ���v��~�Y�V�o�Q�R         �  x���Ak�0��+|Y��-[N�Aؚ�۲�ɡf�0�mESlKƒ�d�~vYK�]
B�W�@�#�~Zۚ������pcu�{BkQsh��
������G�����mkZm���/��F�����᥄+�+��!��<gʜ`Jb�	K��%�����W;Q�ɄDu2+�d'`�]�`��d�]�ׇ�p�=�J3q�f��X�����Ol�=���C�9���r�w�4���,�!�z\�=��&%�{Y@e��C��^	D�w�`\h���Jm�"E�gE��Fe�R�r���-����R{�5`e�s����В��'|=�7a�6|�O�YH)	�i�)��`:�II9c!�3=��I��+�����_>�_������u�w՚�A�3��le��s���2��+#ݯP�r~x���K[�]          �   x��ͱ�  ���~�Ы��[w5&]].B�Yz4�����[�A�B���T^��F��<L�0%84�&����j����F1�kϟP
KT�ܩþCTs�[�Y�3��G��9_���3�����~���&Rs         `   x�3�4���,K-*�,I,Vp�t�/N��4202�50"�P��H�ؐ�M�\�����%T����H�1�jg��@��uMALc]S]#�=... W�"�         C   x�3�4426153�,HI122�tL����2�	�s����@E�9����MLLM!
8]�S�b���� }t�     